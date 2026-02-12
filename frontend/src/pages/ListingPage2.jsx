import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";

function ListingPage2() {
  let navigate = useNavigate();

  let { category, setCategory } = useContext(listingDataContext);

return (
  <div className="w-full min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center relative overflow-auto">
    
    {/* BACK */}
    <div
      className="w-[36px] h-[36px] bg-red-500 hover:bg-red-600 transition cursor-pointer absolute top-5 left-5 rounded-full flex items-center justify-center shadow"
      onClick={() => navigate("/listingpage1")}
    >
      <FaArrowLeftLong className="w-[16px] h-[16px] text-white" />
    </div>

    {/* CONTENT */}
    <div className="max-w-[780px] w-full bg-white rounded-xl shadow-lg flex items-center justify-start flex-col gap-[20px] py-[28px] mt-[50px]">
      <h1 className="text-[16px] md:text-[24px] font-semibold">
        Which of these best describes your place?
      </h1>

      <div className="max-w-[780px] w-full flex flex-wrap items-center justify-center gap-[14px] md:w-[75%]">
        
        {[
          { key: "villa", label: "Villa", icon: <GiFamilyHouse /> },
          { key: "farmHouse", label: "Farm House", icon: <FaTreeCity /> },
          { key: "poolHouse", label: "Pool House", icon: <MdOutlinePool /> },
          { key: "rooms", label: "Rooms", icon: <MdBedroomParent /> },
          { key: "flat", label: "Flat", icon: <BiBuildingHouse /> },
          { key: "pg", label: "PG", icon: <IoBedOutline /> },
          { key: "cabin", label: "Cabin", icon: <GiWoodCabin /> },
          { key: "shops", label: "Shops", icon: <SiHomeassistantcommunitystore /> },
        ].map((item) => (
          <div
            key={item.key}
            className={`w-[150px] h-[90px] flex justify-center items-center flex-col cursor-pointer 
            border rounded-lg text-[14px] transition-all duration-150
            hover:shadow-md hover:-translate-y-[2px] hover:border-red-400
            ${
              category === item.key
                ? "border-red-500 shadow-md scale-[1.02] bg-red-50"
                : "border-gray-200"
            }`}
            onClick={() => setCategory(item.key)}
          >
            <div className={`w-[24px] h-[24px] mb-[2px] ${
              category === item.key ? "text-red-500" : "text-gray-600"
            }`}>
              {item.icon}
            </div>
            <h3 className="font-medium">{item.label}</h3>
          </div>
        ))}
      </div>
    </div>

    {/* NEXT BUTTON */}
    <button
      className="px-[50px] py-[8px] 
      bg-gradient-to-r from-red-500 to-pink-500 
      text-white text-[15px] rounded-lg shadow 
      hover:scale-[1.04] transition 
      disabled:opacity-40 disabled:cursor-not-allowed
      absolute right-[6%] bottom-[6%]"
      onClick={() => navigate("/listingpage3")}
      disabled={!category}
    >
      Next →
    </button>
  </div>
);


}

export default ListingPage2;
