import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";

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

return (
  <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center gap-[8px] flex-col relative overflow-auto">
    
    {/* BACK */}
    <div
      className="w-[30px] h-[30px] bg-red-500 hover:bg-red-600 transition cursor-pointer absolute top-4 left-4 rounded-full flex items-center justify-center shadow"
      onClick={() => navigate("/listingpage2")}
    >
      <FaArrowLeftLong className="w-[14px] h-[14px] text-white" />
    </div>

    {/* LOCATION */}
    <div className="w-[95%] md:w-[78%] mb-[4px]">
      <h1 className="text-[15px] md:text-[20px] font-semibold text-gray-800 truncate">
        In {landMark.toUpperCase()}, {city.toUpperCase()}
      </h1>
    </div>

    {/* IMAGES */}
    <div className="w-[95%] h-[300px] flex flex-col md:flex-row md:w-[78%] gap-2">
      <div className="w-full md:w-[64%] h-[60%] md:h-full overflow-hidden rounded-md shadow">
        <img src={frontEndImage1} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="w-full md:w-[36%] h-[40%] md:h-full flex md:flex-col gap-2">
        <div className="w-full h-full overflow-hidden rounded-md shadow">
          <img src={frontEndImage2} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-full h-full overflow-hidden rounded-md shadow">
          <img src={frontEndImage3} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    {/* TITLE */}
    <div className="w-[95%] md:w-[78%] text-[15px] md:text-[18px] font-medium text-gray-800">
      {title.toUpperCase()} {category.toUpperCase()} , {landMark.toUpperCase()}
    </div>

    {/* DESCRIPTION */}
    <div className="w-[95%] md:w-[78%] text-[13px] md:text-[15px] text-gray-600 leading-snug">
      {description}
    </div>

    {/* PRICE */}
    <div className="w-[95%] md:w-[78%] text-[16px] md:text-[18px] font-semibold text-red-500">
      ₹ {rent} / day
    </div>

    {/* BUTTON */}
    <div className="w-[95%] md:w-[78%] flex justify-end mt-1">
      <button
        className="px-[28px] py-[6px] 
        bg-gradient-to-r from-red-500 to-pink-500 
        text-white text-[14px] rounded-md shadow 
        hover:scale-[1.04] transition 
        disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={handleAddListing}
        disabled={adding}
      >
        {adding ? "Adding..." : "Add Listing"}
      </button>
    </div>
  </div>
);

}

export default ListingPage3;
