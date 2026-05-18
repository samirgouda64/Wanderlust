import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import { authDataContext } from "../../Context/AuthContext";
import { userDataContext } from "../../Context/UserContext";

const ProfileDropdown = ({ profileOpen, setProfileOpen }) => {
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const { serverUrl } = useContext(authDataContext);
  const { userData, setUserData } = useContext(userDataContext);

  const handleViewProfile = () => {
    setProfileOpen(false);
    navigate("/admin/settings");
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true },
      );

      setUserData(null);
      setProfileOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="relative" ref={profileRef}>
      {/* Profile Button */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => setProfileOpen(!profileOpen)}
        className="flex items-center gap-3 cursor-pointer bg-white/80 backdrop-blur-md border border-gray-200 px-3 py-2 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div className="relative">
          <FaUserCircle className="text-4xl text-indigo-600" />

          {/* Online Dot */}
          <span className="absolute bottom-1 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        <div className="hidden sm:block">
          <h4 className="font-semibold text-gray-800 leading-tight">
            {userData?.name || "Admin"}
          </h4>

          <p className="text-xs text-gray-500 capitalize">
            {userData?.role || "admin"}
          </p>
        </div>
      </motion.div>

      {/* Dropdown */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 mt-4 w-80 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden z-50"
          >
            {/* Top Background */}
            <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
              <div className="absolute -bottom-10 left-6">
                <div className="bg-white p-1 rounded-full shadow-lg">
                  <FaUserCircle className="text-7xl text-indigo-600" />
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="pt-14 px-6 pb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {userData?.name || "Admin User"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {userData?.email || "admin@mail.com"}
              </p>

              <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wide">
                {userData?.role || "Admin"}
              </div>
            </div>

            {/* Menu Items */}
            <div className="px-4 pb-5 space-y-3">
              <button
                onClick={handleViewProfile}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-all duration-300 group"
              >
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600 group-hover:scale-110 transition">
                  <FaUser />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold">View Profile</h4>
                  <p className="text-xs text-gray-500">
                    Manage your account settings
                  </p>
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-300 group"
              >
                <div className="p-2 rounded-xl bg-red-100 text-red-600 group-hover:translate-x-1 transition">
                  <FaSignOutAlt />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold">Logout</h4>
                  <p className="text-xs text-red-400">
                    Securely sign out from account
                  </p>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
