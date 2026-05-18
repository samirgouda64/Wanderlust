import React from "react";
import { FaBars } from "react-icons/fa";

const Navbar = ({ sidebarOpen, setSidebarOpen, activeMenu, children }) => {
  return (
    <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-200 transition"
        >
          <FaBars />
        </button>

        <h1 className="text-xl font-bold text-gray-700 capitalize">
          {activeMenu}
        </h1>
      </div>

      <div className="flex items-center gap-5">{children}</div>
    </div>
  );
};

export default Navbar;
