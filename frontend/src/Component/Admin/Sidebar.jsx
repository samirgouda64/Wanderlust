import React from "react";
import { FaShieldAlt, FaTachometerAlt, FaHotel, FaCog } from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={`fixed md:static z-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-full transition-all duration-300 shadow-lg
      ${
        sidebarOpen
          ? "w-64 translate-x-0"
          : "w-64 -translate-x-full md:translate-x-0 md:w-20"
      }`}
    >
      <div className="p-4 text-xl font-bold flex items-center gap-2 border-b border-gray-700">
        <FaShieldAlt />
        {sidebarOpen && <span>Admin Panel</span>}
      </div>

      <ul className="mt-6 space-y-3">
        <li
          onClick={() => navigate("/admin/dashboard")}
          className={`flex items-center gap-3 px-4 py-3 rounded cursor-pointer mx-2
          ${location.pathname === "/admin/dashboard" ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
          <FaTachometerAlt />
          {sidebarOpen && "Dashboard"}
        </li>

        <li
          onClick={() => navigate("/admin/listings")}
          className={`flex items-center gap-3 px-4 py-3 rounded cursor-pointer mx-2
          ${location.pathname === "/admin/listings" ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
          <FaHotel />
          {sidebarOpen && "Hotel Listings"}
        </li>

        <li
          onClick={() => navigate("/admin/Settings")}
          className={`flex items-center gap-3 px-4 py-3 rounded cursor-pointer mx-2
          ${location.pathname === "/admin/Settings" ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
          <FaCog />
          {sidebarOpen && "Settings"}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
