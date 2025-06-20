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
    handleBooking,booking
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
        }
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

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackEndImage1(file);
  };
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackEndImage2(file);
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackEndImage3(file);
  };

  const handleDeleteListing = async () => {
    setDeleting(true);
    try {
      let result = await axios.delete(
        serverUrl + `/api/listing/delete/${cardDetails._id}`,
        {
          withCredentials: true,
        }
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
  };

  useEffect(() => {
    let today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  });

  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center gap-[10px] flex-col relative overflow-auto">
      <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" />
      </div>

      <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]">
        <h1 className="text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-[0px]">
          {`In ${cardDetails.landMark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}
        </h1>
      </div>

      <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row">
        <div className="w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]">
          <img src={cardDetails.image1} alt="" className="w-[100%]" />
        </div>
        <div className="w-[100%] h-[50%] flex items-center justify-center md:w-[50%] md:h-[100%] md:flex-col">
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px]">
            <img src={cardDetails.image2} alt="" className="w-[100%]" />
          </div>
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px]">
            <img src={cardDetails.image3} alt="" className="w-[100%]" />
          </div>
        </div>
      </div>

      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">
        {`${cardDetails.title.toUpperCase()} ${cardDetails.category.toUpperCase()} , ${cardDetails.landMark.toUpperCase()} `}
      </div>

      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] text-gray-800">
        {`${cardDetails.description.toUpperCase()} `}
      </div>

      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">
        {`Rs.${cardDetails.rent}/day`}
      </div>

      <div className="w-[95%] h-[50px] flex items-center justify-start px-[110px]">
        {cardDetails.host == userData._id ? (
          <button
            className="px-[30px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg text-nowrap "
            onClick={() => setUpdatePopUp((prev) => !prev)}
          >
            Edit listing
          </button>
        ) : (
          <button
            className="px-[30px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg text-nowrap "
            onClick={() => setBookingPopUp((prev) => !prev)}
          >
            Reserve
          </button>
        )}
      </div>

      {/* Update Listing Page */}

      {updatePopUp && (
        <div className="w-[100%] h-[100%] flex items-center justify-center bg-[#000000a6] absolute top-[0px] z-[100] backdrop-blur-sm">
          <RxCross2
            className="w-[30px] h-[30px] bg-[red] cursor-pointer absolute top-[5%] left-[25px] rounded-[50%] flex items-center justify-center"
            onClick={() => setUpdatePopUp(false)}
          />

          <form
            action=""
            className="max-w-[900px] w-[90%] h-[550px] flex items-center justify-start flex-col md:items-center gap-[10px] overflow-auto mt-[50px] text-[white] bg-[#272727] p-[20px] rounded-lg"
            onSubmit={(e) => {
              e.preventDefault();
              //   navigate("/listingpage2");
            }}
          >
            <div className="w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg">
              Update Your Details
            </div>
            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
              <label htmlFor="title" className="text-[20px]">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Title of the Place"
              />
            </div>

            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
              <label htmlFor="des" className="text-[20px]">
                Description
              </label>
              <textarea
                name=""
                id="des"
                className="w-[90%] h-[65px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>

            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
              <label htmlFor="image1" className="text-[20px]">
                Image1
              </label>
              <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                <input
                  type="file"
                  id="image1"
                  className="w-[100%] text-[15px] px-[10px]"
                  required
                  onChange={handleImage1}
                />
              </div>
            </div>

            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
              <label htmlFor="image2" className="text-[20px]">
                Image2
              </label>
              <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                <input
                  type="file"
                  id="image2"
                  className="w-[100%] text-[15px] px-[10px]"
                  required
                  onChange={handleImage2}
                />
              </div>
            </div>

            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
              <label htmlFor="image3" className="text-[20px]">
                Image3
              </label>
              <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                <input
                  type="file"
                  id="image3"
                  className="w-[100%] text-[15px] px-[10px]"
                  required
                  onChange={handleImage3}
                />
              </div>
            </div>

            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
              <label htmlFor="rent" className="text-[20px]">
                Rent
              </label>
              <input
                type="number"
                id="rent"
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]"
                required
                onChange={(e) => setRent(e.target.value)}
                value={rent}
                placeholder="Price in Rs._____"
              />
            </div>

            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
              <label htmlFor="city" className="text-[20px]">
                City
              </label>
              <input
                type="text"
                id="city"
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]"
                required
                onChange={(e) => setCity(e.target.value)}
                value={city}
                placeholder="City, Country"
              />
            </div>

            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
              <label htmlFor="landmark" className="text-[20px]">
                Landmark
              </label>
              <input
                type="text"
                id="landmark"
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]"
                required
                onChange={(e) => setLandMark(e.target.value)}
                value={landMark}
              />
            </div>

            <div className="w-[100%] flex items-center justify-center gap-[30px] mt-[20px]">
              <button
                className="px-[10px] py-[10px] bg-[red] text-[white] text-[15px] md:px-[100px] rounded-lg md:text-[18px] text-wrap"
                onClick={handleUpdateListing}
                disabled={updating}
              >
                {updating ? "updating..." : "Update Listing"}
              </button>

              <button
                className="px-[10px] py-[10px] bg-[red] text-[white] text-[15px] md:px-[100px] rounded-lg md:text-[18px] text-wrap"
                onClick={handleDeleteListing}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Listing"}
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
