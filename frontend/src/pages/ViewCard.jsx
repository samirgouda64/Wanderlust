import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";
import { userDataContext } from "../Context/UserContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { FaStar } from "react-icons/fa";
import { bookingDataContext } from "../Context/BookingContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ViewCard() {
  let navigate = useNavigate();
  let { cardDetails } = useContext(listingDataContext);
  let { userData } = useContext(userDataContext);
  let [updatePopUp, setUpdatePopUp] = useState(false);
  let [bookingPopUp, setBookingPopUp] = useState(false);

  let [title, setTitle] = useState(cardDetails.title);
  let [description, setDescription] = useState(cardDetails.description);
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [rent, setRent] = useState(cardDetails.rent);
  let [city, setCity] = useState(cardDetails.city);
  let [landMark, setLandMark] = useState(cardDetails.landMark);
  let { serverUrl } = useContext(authDataContext);
  let { updating, setUpdating } = useContext(listingDataContext);
  let { deleting, setDeleting } = useContext(listingDataContext);
  let [minDate, setMinDate] = useState("");

  let {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    handleBooking,
    booking,
  } = useContext(bookingDataContext);

  useEffect(() => {
    if (checkIn && checkOut) {
      let inDate = new Date(checkIn);
      let outDate = new Date(checkOut);
      let n = (outDate - inDate) / (24 * 60 * 60 * 1000);
      setNight(n);
      let airBnbCharge = cardDetails.rent * (7 / 100);
      let tax = cardDetails.rent * (7 / 100);

      if (n > 0) {
        setTotal(cardDetails.rent * n + airBnbCharge + tax);
      } else {
        setTotal(0);
      }
    }
  }, [checkIn, checkOut, cardDetails.rent, total]);

  const handleUpdateListing = async () => {
    setUpdating(true);

    try {
      let formData = new FormData();
      formData.append("title", title);
      if (backEndImage1) {
        formData.append("image1", backEndImage1);
      }
      if (backEndImage2) {
        formData.append("image2", backEndImage2);
      }
      if (backEndImage3) {
        formData.append("image3", backEndImage3);
      }
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landMark", landMark);

      let result = await axios.post(
        serverUrl + `/api/listing/update/${cardDetails._id}`,
        formData,
        {
          withCredentials: true,
        },
      );
      setUpdating(false);
      console.log(result);
      navigate("/");
      toast.success("Listing updated");
      setTitle("");
      setDescription("");
      setBackEndImage1(null);
      setBackEndImage2(null);
      setBackEndImage3(null);
      setRent("");
      setCity("");
      setLandMark("");
    } catch (error) {
      setUpdating(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const [imageNames, setImageNames] = useState({
    image1: "",
    image2: "",
    image3: "",
  });

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackEndImage1(file);
    setImageNames((prev) => ({ ...prev, image1: file.name }));
  };
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackEndImage2(file);
    setImageNames((prev) => ({ ...prev, image2: file.name }));
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackEndImage3(file);
    setImageNames((prev) => ({ ...prev, image3: file.name }));
  };

  const handleDeleteListing = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your listing.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f43f5e",
    });
    if (result.isConfirmed) {
      setDeleting(true);
      try {
        let result = await axios.delete(
          serverUrl + `/api/listing/delete/${cardDetails._id}`,
          {
            withCredentials: true,
          },
        );
        console.log(result.data);
        navigate("/");
        toast.success("Listing Delete");
        setDeleting(false);
      } catch (error) {
        setDeleting(false);
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    let today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  });

  const handleReserve = () => {
    if (!userData) {
      navigate("/login");
      toast.warning("You must login to reserve this.", {});
      return;
    }
    setBookingPopUp(true);
  };

  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center gap-[10px] flex-col relative overflow-auto">
      <div
        className="w-[35px] h-[35px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-[15px] h-[15px] text-[white]" />
      </div>

      <div className="w-[80%] flex items-start justify-start text-[15px] md:w-[70%] mb-[10px]">
        <h1 className="text-[15px] text-[#272727] md:text-[20px] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-[0px]">
          {`In ${cardDetails.landMark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}
        </h1>
      </div>

      <div className="w-[80%] h-[300px] flex items-center justify-center flex-col md:w-[70%] md:flex-row gap-3">
        <div className="w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]">
          <img src={cardDetails.image1} alt="" className="w-[100%]" />
        </div>
        <div className="w-[100%] h-[50%] flex items-center justify-center md:w-[50%] md:h-[100%] md:flex-col gap-3">
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px]">
            <img src={cardDetails.image2} alt="" className="w-[100%]" />
          </div>
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px]">
            <img src={cardDetails.image3} alt="" className="w-[100%]" />
          </div>
        </div>
      </div>

      <div className="w-[80%] flex items-start justify-start text-[15px] md:w-[70%] md:text-[18px]">
        {`${cardDetails.title.toUpperCase()} ${cardDetails.category.toUpperCase()} , ${cardDetails.landMark.toUpperCase()} `}
      </div>

      <div className="w-[80%] flex items-start justify-start text-[13px] md:w-[70%] md:text-[12px] text-gray-800">
        {`${cardDetails.description.toUpperCase()} `}
      </div>

      <div className="w-[80%] flex items-start justify-start text-[18px] md:w-[70%] md:text-[20px]">
        {`Rs.${cardDetails.rent}/day`}
      </div>

      <div className="w-[88%] h-[50px] flex items-center justify-start px-[110px]">
        {cardDetails.host == userData?._id ? (
          <button
            className="px-[30px] py-[10px] bg-[red] text-[white] text-[15px] md:px-[70px] rounded-lg text-nowrap "
            onClick={() => setUpdatePopUp((prev) => !prev)}
          >
            Edit listing
          </button>
        ) : (
          <button
            className="px-[30px] py-[10px] bg-[red] text-[white] text-[15px] md:px-[70px] rounded-lg text-nowrap "
            onClick={(e) => {
              e.stopPropagation();
              handleReserve();
            }}
          >
            {userData ? "Reserve" : "Login to Reserve"}
          </button>
        )}
      </div>

      {/* Update Listing Page */}

      {updatePopUp && (
        <div className="w-full min-h-screen flex items-center justify-center bg-black/60 backdrop-blur-sm fixed top-0 left-0 z-50 p-4">
          {/* Form */}
          <form
            className="max-w-[750px] w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 flex flex-col gap-4 overflow-auto relative border border-white/30"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Header */}
            <div className="text-gray-400 text-[12px] uppercase tracking-widest">
              Update Your Details
            </div>
            {/* Close Button */}
            <div
              className="w-10 h-10 bg-white/80 backdrop-blur hover:bg-white cursor-pointer rounded-full flex items-center justify-center shadow-lg absolute top-4 right-4 transition"
              onClick={() => setUpdatePopUp(false)}
            >
              <RxCross2 className="w-5 h-5 text-red-500" />
            </div>

            {/* Title */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 text-[14px]">Title</label>
              <input
                type="text"
                className="h-10 border rounded-lg px-3 text-[14px] focus:ring-2 focus:ring-red-300 outline-none transition"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Title of the Place..."
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 text-[14px]">Description</label>
              <textarea
                className="h-16 border rounded-lg px-3 py-1 text-[14px] focus:ring-2 focus:ring-red-300 outline-none resize-none transition"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Tell what makes your place special..."
              />
            </div>

            {/* Images */}
            <div className="text-gray-400 text-[12px] uppercase tracking-widest">
              Upload Images
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { label: "Image1", key: "image1", handler: handleImage1 },
                { label: "Image2", key: "image2", handler: handleImage2 },
                { label: "Image3", key: "image3", handler: handleImage3 },
              ].map((img, i) => (
                <label
                  key={i}
                  className={`flex flex-col items-center justify-center gap-1 h-[70px] border-2 rounded-xl cursor-pointer transition text-center
                  ${
                    imageNames[img.key]
                      ? "border-green-400 bg-green-50"
                      : "border-dashed hover:border-red-400 hover:bg-red-50"
                  }`}
                >
                  <span className="text-[12px] text-gray-500">{img.label}</span>
                  <span
                    className={`text-[11px] w-[90%] truncate ${
                      imageNames[img.key] ? "text-green-700" : "text-red-400"
                    }`}
                  >
                    {imageNames[img.key] || "Click to upload"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    required
                    onChange={img.handler}
                  />
                </label>
              ))}
            </div>

            {/* Location & Rent */}
            <div className="text-gray-400 text-[12px] uppercase tracking-widest mt-2">
              Location & Pricing
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-[14px]">Rent</label>
                <input
                  type="number"
                  className="h-10 border rounded-lg px-3 text-[14px] focus:ring-2 focus:ring-red-300 outline-none transition"
                  required
                  onChange={(e) => setRent(e.target.value)}
                  value={rent}
                  placeholder="₹ Rent.."
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-[14px]">City</label>
                <input
                  type="text"
                  className="h-10 border rounded-lg px-3 text-[14px] focus:ring-2 focus:ring-red-300 outline-none transition"
                  required
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  placeholder="City..."
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-[14px]">Landmark</label>
                <input
                  type="text"
                  className="h-10 border rounded-lg px-3 text-[14px] focus:ring-2 focus:ring-red-300 outline-none transition"
                  required
                  onChange={(e) => setLandMark(e.target.value)}
                  value={landMark}
                  placeholder="Landmark..."
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-4 gap-3">
              <button
                className="w-[100px] py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-xl hover:scale-[1.03] transition font-medium tracking-wide"
                onClick={handleUpdateListing}
                disabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
              <button
                className="w-[100px] py-1.5 bg-gray-500 text-white rounded-xl hover:shadow-xl hover:scale-[1.03] transition font-medium tracking-wide"
                onClick={handleDeleteListing}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </form>
        </div>
      )}

      {bookingPopUp && (
        <div className="w-[100%] min-h-[100%] flex items-center justify-center flex-col gap-[30px] bg-[#ffffffcd] absolute top-[0px] z-[100] p-[20px] backdrop-blur-sm md:flex-row md:gap-[100px]">
          <RxCross2
            className="w-[30px] h-[30px] bg-[red] cursor-pointer absolute top-[5%] left-[25px] rounded-[50%] flex items-center justify-center"
            onClick={() => setBookingPopUp(false)}
          />

          <form
            className="max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f7fbfcfe] p-[20px] rounded-lg flex items-center justify-center flex-col gap-[10px] border-[1px] border-[#abaaaa]"
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 className="w-[100%] flex items-center justify-center py-[10px] text-[25px] border-b-[1px] border-[#a3a3a3]">
              Confirm & Book
            </h1>
            <div className="w-[100%] h-[70%]  mt-[10px] rounded-lg p-[10px]">
              <h3 className="text-[19px] font-semibold">Your Trip -</h3>

              <div className="w-[90%] flex items-center justify-start gap-[22px] mt-[20px] md:items-center md:justify-center flex-col md:flex-row ">
                <label htmlFor="checkin" className="text-[20px] md:text-[20px]">
                  CheckIn
                </label>
                <input
                  type="date"
                  min={minDate}
                  id="checkin"
                  className="w-[200px] h-[40px] border-2 border-[#555656] rounded-[10px] bg-transparent text-[15px] px-[10px] md:text-[18px]"
                  required
                  onChange={(e) => setCheckIn(e.target.value)}
                  value={checkIn}
                />
              </div>

              <div className="w-[90%] flex items-center justify-start gap-[10px] mt-[40px] md:items-center md:justify-center flex-col md:flex-row ">
                <label
                  htmlFor="checkout"
                  className="text-[20px] md:text-[20px]"
                >
                  CheckOut
                </label>
                <input
                  type="date"
                  min={minDate}
                  id="checkout"
                  className="w-[200px] h-[40px] border-2 border-[#555656] rounded-[10px] bg-transparent text-[15px] px-[10px] md:text-[18px]"
                  required
                  onChange={(e) => setCheckOut(e.target.value)}
                  value={checkOut}
                />
              </div>
              <div className="w-[100%] flex items-center justify-center">
                <button
                  className="px-[80px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg  text-nowrap mt-[30px]"
                  onClick={() => handleBooking(cardDetails._id)}
                  disabled={booking}
                >
                  {booking ? "Booking..." : "Book Now"}
                </button>
              </div>
            </div>
          </form>

          <div className="max-w-[450px] w-[90%] h-[450px] bg-[#f7fbfcfe] p-[20px] rounded-lg flex items-center justify-center flex-col gap-[10px] border-[1px] border-[#abaaaa]">
            <div className="w-[95%] h-[30%] border-[1px] border-[#abaaaa] rounded-lg flex justify-center items-center gap-[8px] p-[20px] overflow-hidden">
              <div className="w-[70px] h-[90px] flex items-center justify-center flex-shrink-0 rounded-lg md:w-[100px] md:h-[100px]">
                <img
                  className="w-[100%] h-[100%] rounded-lg"
                  src={cardDetails.image1}
                  alt=""
                />
              </div>
              <div className="w-[80%] h-[100px] gap-[5px]">
                <h1 className="w-[90%] truncate">{`IN ${cardDetails.landMark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}</h1>
                <h1>{cardDetails.title.toUpperCase()}</h1>
                <h1>{cardDetails.category.toUpperCase()}</h1>
                <h1 className="flex items-center justify-start gap-[5px]">
                  <FaStar className="text-[#eb6262]" />
                  {cardDetails.ratings}
                </h1>
              </div>
            </div>

            <div className="w-[95%] h-[60%] border-[1px] border-[#abaaaa] rounded-lg flex justify-start items-start p-[20px] gap-[15px] flex-col">
              <h1 className="text-[22px] font-semibold">Booking Price -</h1>
              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">
                  {`₹${cardDetails.rent} X ${night} nights`}
                </span>
                <span> {cardDetails.rent * night} </span>
              </p>

              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">Tax</span>
                <span> {(cardDetails.rent * 7) / 100} </span>
              </p>

              <p className="w-[100%] flex justify-between items-center px-[20px] border-b-[1px] border-gray-500 pb-[10px]">
                <span className="font-semibold">Airbnb Charge</span>
                <span> {(cardDetails.rent * 7) / 100} </span>
              </p>

              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">Total Price</span>
                <span> {total} </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCard;
