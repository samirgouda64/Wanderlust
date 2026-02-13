import React, { useContext, useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { bookingDataContext } from "../Context/BookingContext";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Star from "../Component/Star";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";

function Booked() {
  let { bookingData } = useContext(bookingDataContext);
  let [star, setStar] = useState(null);
  let { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);
  let { getListing, cardDetails } = useContext(listingDataContext);

  let navigate = useNavigate();

  const handleRating = async (id) => {
    try {
      let result = await axios.post(
        serverUrl + `/api/listing/ratings/${id}`,
        {
          ratings: star,
        },
        { withCredentials: true },
      );
      await getListing();
      await getCurrentUser();
      console.log(result);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleStar = async (value) => {
    setStar(value);
    // console.log("You rated", value)
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center relative overflow-hidden">
      {/* Glow */}
      <div className="absolute w-[300px] h-[300px] bg-green-500/20 blur-[120px] rounded-full top-[-80px] left-[-80px] animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] bg-pink-500/20 blur-[120px] rounded-full bottom-[-80px] right-[-80px] animate-pulse"></div>

      {/* Card */}
      <div
        className="w-[95%] max-w-[420px] bg-white/5 backdrop-blur-xl border-[1px] border-white/10 rounded-[20px] shadow-2xl p-[25px] flex flex-col gap-[18px] text-[white] 
                        animate-[fadeIn_0.6s_ease-out] hover:scale-[1.01] transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-center flex-col gap-[6px]">
          <div className="w-[70px] h-[70px] rounded-full bg-green-500/20 flex items-center justify-center shadow-lg animate-[pop_0.5s_ease-out]">
            <GiConfirmed className="w-[45px] h-[45px] text-[green] animate-pulse" />
          </div>
          <h1 className="text-[20px] font-semibold">Booking Successful</h1>
          <span className="text-[12px] text-white/60">Payment completed</span>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-[10px] text-[12px]">
          <div className="w-[100%] flex items-center justify-between border-b border-white/10 pb-[4px]">
            <span className="text-white/50">ID</span>
            <span className="font-mono text-green-400 max-w-[180px] truncate">
              {bookingData._id}
            </span>
          </div>

          <div className="w-[100%] flex items-center justify-between border-b border-white/10 pb-[4px]">
            <span className="text-white/50">Owner</span>
            <span className="max-w-[180px] truncate">
              {bookingData.host?.email}
            </span>
          </div>

          <div className="w-[100%] flex items-center justify-between">
            <span className="text-white/50">Total</span>
            <span className="text-[18px] font-bold text-green-400">
              ₹ {bookingData.totalRent}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="w-[100%] bg-white/5 rounded-[12px] p-[12px] flex items-center justify-center flex-col gap-[6px]">
          <h2 className="text-[14px] font-semibold">Rate experience</h2>
          <Star onRate={handleStar} />
          <span className="text-[12px] text-white/60">{star} / 5</span>
        </div>

        {/* CTA */}
        <button
          onClick={() => handleRating(cardDetails._id)}
          className="w-[100%] py-[8px] rounded-[10px] bg-gradient-to-r from-green-500 to-emerald-400 
                    text-[black] font-semibold text-[14px] tracking-wide 
                    hover:scale-105 active:scale-95 transition-all"
        >
          Submit Feedback
        </button>
      </div>

      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-[20px] left-[20px] text-white/50 text-[14px] hover:text-[white] transition"
      >
        ← Home
      </button>
    </div>
  );
}

export default Booked;
