import React, { useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

const ProfileDropdown = ({ profileOpen, setProfileOpen }) => {
  const profileRef = useRef(null);

  return (
    <div className="relative" ref={profileRef}>
      {/* Profile Button */}
      <div
        onClick={() => setProfileOpen(!profileOpen)}
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition"
      >
        <FaUserCircle className="text-3xl text-gray-600" />
        <span className="hidden sm:block font-medium">Admin</span>
      </div>

      {/* Dropdown */}
      {profileOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-4xl" />

              <div>
                <h3 className="font-semibold text-lg">Admin User</h3>

                <p className="text-sm opacity-90">admin@mail.com</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="p-4">
            <div className="flex gap-3">
              <button className="flex-1 bg-indigo-500 text-white py-2 rounded-lg font-medium hover:bg-indigo-600 transition shadow-sm">
                View
              </button>

              <button className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition shadow-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
