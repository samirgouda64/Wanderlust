import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";
import PageLoader from "../Component/Loader/PageLoader";
import Swal from "sweetalert2";

function ListingPage3() {
  let navigate = useNavigate();
  let {
    title,
    setTitle,
    description,
    setDescription,
    frontEndImage1,
    setFrontEndImage1,
    frontEndImage2,
    setFrontEndImage2,
    frontEndImage3,
    setFrontEndImage3,
    backEndImage1,
    setBackEndImage1,
    backEndImage2,
    setBackEndImage2,
    backEndImage3,
    setBackEndImage3,
    rent,
    setRent,
    city,
    setCity,
    landMark,
    setLandMark,
    category,
    setCategory,
    handleAddListing,
    adding,
    setAdding,
  } = useContext(listingDataContext);

  const handleAddClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to add your listing?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Add it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f43f5e",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setAdding(true);
          await handleAddListing();
        } catch (error) {
          console.error(error);
        } finally {
          setAdding(false);
        }
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center gap-[10px] flex-col relative overflow-auto">
      <PageLoader
        visible={adding}
        text="Adding Listing..."
        subText="Please wait"
      />

      {/* Back */}
      <div
        className="w-[34px] h-[34px] bg-red-500 hover:bg-red-600 transition cursor-pointer absolute top-[16px] left-[16px] rounded-full flex items-center justify-center shadow-lg hover:scale-105"
        onClick={() => navigate("/listingpage2")}
      >
        <FaArrowLeftLong className="w-[16px] h-[16px] text-white" />
      </div>

      {/* LOCATION */}
      <div className="w-[95%] md:w-[78%]">
        <h1 className="text-[16px] md:text-[22px] font-semibold text-gray-800 truncate">
          In {landMark.toUpperCase()}, {city.toUpperCase()}
        </h1>
      </div>

      {/* IMAGES */}
      <div className="w-[95%] h-[320px] flex flex-col md:flex-row md:w-[78%] gap-[8px]">
        <div className="w-full md:w-[64%] h-[60%] md:h-full overflow-hidden rounded-[12px] shadow-lg group">
          <img
            src={frontEndImage1}
            alt=""
            className="w-full h-full object-cover group-hover:scale-[1.05] transition duration-500"
          />
        </div>

        <div className="w-full md:w-[36%] h-[40%] md:h-full flex md:flex-col gap-[8px]">
          <div className="w-full h-full overflow-hidden rounded-[12px] shadow-lg group">
            <img
              src={frontEndImage2}
              alt=""
              className="w-full h-full object-cover group-hover:scale-[1.05] transition duration-500"
            />
          </div>
          <div className="w-full h-full overflow-hidden rounded-[12px] shadow-lg group">
            <img
              src={frontEndImage3}
              alt=""
              className="w-full h-full object-cover group-hover:scale-[1.05] transition duration-500"
            />
          </div>
        </div>
      </div>

      {/* TITLE */}
      <div className="w-[95%] md:w-[78%] text-[16px] md:text-[19px] font-medium text-gray-900">
        {title.toUpperCase()} {category.toUpperCase()} ,{" "}
        {landMark.toUpperCase()}
      </div>

      {/* DESCRIPTION */}
      <div className="w-[95%] md:w-[78%] text-[13px] md:text-[15px] text-gray-600 leading-relaxed">
        {description}
      </div>

      {/* PRICE */}
      <div className="w-[95%] md:w-[78%] text-[18px] md:text-[20px] font-bold text-red-500">
        ₹ {rent}{" "}
        <span className="text-[13px] text-gray-500 font-normal">/ day</span>
      </div>

      {/* CTA */}
      <div className="w-[95%] md:w-[78%] flex justify-end mt-[4px]">
        <button
          className="px-[32px] py-[8px] 
        bg-gradient-to-r from-red-500 to-pink-500 
        text-white text-[14px] rounded-[10px] shadow-lg 
        hover:scale-[1.06] hover:shadow-xl transition-all 
        active:scale-[0.96]
        disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={handleAddClick}
          disabled={adding}
        >
          {adding ? "Adding..." : "Publish Listing"}
        </button>
      </div>
    </div>
  );
}

export default ListingPage3;
