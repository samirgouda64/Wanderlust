import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { bookingDataContext } from "../Context/BookingContext";

function Card({
  title,
  landMark,
  image1,
  image2,
  image3,
  rent,
  city,
  id,
  ratings,
  isBooked,
  host,
}) {
  let navigate = useNavigate();
  let { userData } = useContext(userDataContext);
  let { handleViewCard } = useContext(listingDataContext);

  let [popUp, setPopUp] = useState(false);
  let {cancelBooking} = useContext(bookingDataContext);

  // const handleClick = () => {
  //   if (userData) {
  //     handleViewCard(id);
  //   } else {
  //     navigate("/login");
  //   }
  // };

  const handleClick = () => {
    handleViewCard(id);
  };

return (
  <div
    className="w-[200px] max-w-[90%] h-[260px] bg-white flex flex-col rounded-xl cursor-pointer relative z-[10] 
               shadow-md"
    onClick={() => (!isBooked ? handleClick() : null)}
  >
    {/* Booked Badge */}
    {isBooked && (
      <div className="text-green-600 bg-white/90 backdrop-blur-md rounded-full absolute right-2 top-2 
                      flex items-center gap-1 px-2 py-1 text-xs shadow">
        <GiConfirmed className="w-[16px] h-[16px]" />
        Booked
      </div>
    )}

    {/* Cancel Badge */}
    {isBooked && host == userData?._id && (
      <div
        className="text-red-500 bg-white/90 backdrop-blur-md rounded-full absolute right-2 top-[45px] 
                   flex items-center gap-1 px-2 py-1 text-xs shadow"
        onClick={(e) => {e.stopPropagation(); setPopUp((prev) => !prev)}}
      >
        <FcCancel className="w-[16px] h-[16px]" />
        Cancel
      </div>
    )}

    {/* Popup */}
    {popUp && (
      <div className="w-[260px] h-[110px] bg-white/95 backdrop-blur-lg absolute top-[110px] left-[10px] 
                      rounded-lg shadow-lg flex flex-col overflow-hidden">
        <div className="h-[50%] flex items-center justify-center text-gray-700 text-sm">
          Cancel this booking?
        </div>
        <div className="h-[50%] flex items-center justify-center gap-3">
          <button
            className="px-4 py-1 bg-red-500 text-white rounded-md text-sm"
            onClick={(e) => {
              e.stopPropagation();
              cancelBooking(id);
              setPopUp((prev) => !prev);
            }}
          >
            Yes
          </button>
          <button
            className="px-4 py-1 bg-gray-300 text-gray-800 rounded-md text-sm"
            onClick={(e) =>{e.stopPropagation(); setPopUp((prev) => !prev)}}
          >
            No
          </button>
        </div>
      </div>
    )}

    {/* Images */}
    <div className="w-full h-[65%] rounded-xl overflow-hidden">
      <div className="w-full h-full flex">
        <img src={image1} className="w-full flex-shrink-0 object-cover" />
        <img src={image2} className="w-full flex-shrink-0 object-cover" />
        <img src={image3} className="w-full flex-shrink-0 object-cover" />
      </div>
    </div>

    {/* Details */}
    <div className="w-full h-[35%] p-3 flex flex-col gap-1">
      <div className="flex justify-between items-center text-sm">
        <span className="w-[75%] font-semibold text-gray-700 truncate">
          {landMark.toUpperCase()}, {city.toUpperCase()}
        </span>
        <span className="flex items-center gap-1 text-xs">
          <FaStar className="text-yellow-500" />
          {ratings}
        </span>
      </div>

      <span className="text-xs text-gray-500 truncate">
        {title.toUpperCase()}
      </span>

      <span className="text-md font-bold text-red-500">
        ₹{rent} <span className="text-xs font-normal text-gray-500">/day</span>
      </span>
    </div>
  </div>
);

}

export default Card;
