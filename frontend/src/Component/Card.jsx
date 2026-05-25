import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";
import { bookingDataContext } from "../Context/BookingContext";

import { FaStar, FaHeart } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";

import { optimizeImage } from "../utils/optimizeImage";

function Card({
  title,
  landMark,
  image1,
  rent,
  city,
  id,
  ratings,
  isBooked,
  host,
}) {
  const navigate = useNavigate();

  const { userData } = useContext(userDataContext);
  const { handleViewCard } = useContext(listingDataContext);
  const { cancelBooking } = useContext(bookingDataContext);

  const [popUp, setPopUp] = useState(false);

  const handleClick = () => {
    handleViewCard(id);
  };

  const width = window.innerWidth < 768 ? 400 : 700;

  return (
    <div
      onClick={() => (!isBooked ? handleClick() : null)}
      className="
      group
      bg-white
      rounded-2xl
      overflow-hidden
      cursor-pointer
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      shadow-lg
      relative
      border border-gray-100
    "
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-[140px] bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={optimizeImage(image1, width)}
          loading="lazy"
          className="
          w-full
          h-full
          object-cover
          transition-transform
          duration-500
          group-hover:scale-110
        "
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Wishlist Button */}
        {/* <button
          className="
          absolute
          top-4
          right-4
          bg-white
          backdrop-blur-md
          p-2.5
          rounded-full
          shadow-lg
          hover:scale-110
          transition-all
          duration-200
          hover:bg-pink-50
        "
        >
          <FaHeart className="text-red-500 text-sm" />
        </button> */}

        {/* Booked Badge */}
        {isBooked && (
          <div
            className="
            absolute
            left-4
            top-4
            bg-gradient-to-r
            from-green-400
            to-green-600
            text-white
            text-xs
            px-4
            py-2
            rounded-full
            flex
            items-center
            gap-1
            font-semibold
            shadow-lg
          "
          >
            <GiConfirmed className="text-sm" />
            Booked
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Location + Rating */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h2 className="font-bold text-[16px] text-gray-900 line-clamp-1">
              {landMark}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-1">{city}</p>
          </div>

          <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1.5 rounded-full">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-sm font-semibold text-gray-900">
              {ratings}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-600">
              ₹{rent}
            </span>
            <span className="text-gray-500 text-sm">/ night</span>
          </div>
        </div>
      </div>

      {/* Cancel Booking */}
      {isBooked && host == userData?._id && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setPopUp(true);
          }}
          className="
          absolute
          bottom-4
          right-4
          bg-white
          shadow-lg
          border border-gray-200
          px-3
          py-2
          rounded-full
          text-xs
          flex
          items-center
          gap-1.5
          hover:bg-red-50
          hover:border-red-300
          transition-all
          duration-200
          font-medium
        "
        >
          <FcCancel className="text-sm" />
          Cancel
        </button>
      )}

      {/* Popup */}
      {popUp && (
        <div
          className="
          absolute
          inset-0
          bg-black/50
          backdrop-blur-sm
          flex
          items-center
          justify-center
          z-20
          rounded-2xl
        "
        >
          <div
            className="
            bg-white
            rounded-2xl
            p-6
            w-[85%]
            shadow-2xl
            border border-gray-100
          "
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-center text-gray-900">
              Cancel Booking?
            </h2>
            <p className="text-gray-600 text-center mt-2 text-sm">
              Are you sure you want to cancel this booking?
            </p>

            <div className="flex gap-3 mt-6">
              <button
                className="
                flex-1
                bg-gradient-to-r
                from-red-500
                to-red-600
                hover:from-red-600
                hover:to-red-700
                text-white
                py-2.5
                rounded-lg
                font-semibold
                transition-all
                duration-200
              "
                onClick={() => {
                  cancelBooking(id);
                  setPopUp(false);
                }}
              >
                Yes, Cancel
              </button>

              <button
                className="
                flex-1
                bg-gray-100
                hover:bg-gray-200
                text-gray-900
                py-2.5
                rounded-lg
                font-semibold
                transition-all
                duration-200
              "
                onClick={() => setPopUp(false)}
              >
                Keep It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
