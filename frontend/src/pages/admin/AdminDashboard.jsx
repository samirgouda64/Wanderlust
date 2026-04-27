import React, { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaUserCircle,
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaShieldAlt,
  FaHotel,
  FaBed,
  FaMoneyBillWave,
  FaUserCheck,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-full transition-all duration-300 shadow-lg
        ${
          sidebarOpen
            ? "w-64 translate-x-0"
            : "w-64 -translate-x-full md:translate-x-0 md:w-20"
        }`}
      >
        {/* Logo */}
        <div className="p-4 text-xl font-bold flex items-center gap-2 border-b border-gray-700">
          <FaShieldAlt />
          {sidebarOpen && <span>Admin Panel</span>}
        </div>

        {/* Menu */}
        <ul className="mt-6 space-y-3">
          <li
            onClick={() => setActiveMenu("dashboard")}
            className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer transition ${
              activeMenu === "dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <FaTachometerAlt /> {sidebarOpen && "Dashboard"}
          </li>

          <li
            onClick={() => setActiveMenu("users")}
            className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer transition ${
              activeMenu === "users" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <FaUsers /> {sidebarOpen && "Users"}
          </li>

          <li
            onClick={() => setActiveMenu("settings")}
            className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer transition ${
              activeMenu === "settings" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <FaCog /> {sidebarOpen && "Settings"}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Navbar */}
        <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-200 transition"
          >
            <FaBars />
          </button>

          <h1 className="text-xl md:text-2xl font-bold text-gray-700 capitalize">
            {activeMenu}
          </h1>

          {/* Profile Section */}
          <div className="relative" ref={profileRef}>
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition"
            >
              <FaUserCircle className="text-2xl text-gray-600" />
              <span className="hidden sm:block font-medium">Admin</span>
            </div>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-fadeIn">
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
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* Dashboard */}

          {activeMenu === "dashboard" && (
            <div className="space-y-6">
              {/* Top Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Users */}
                <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition border-l-4 border-blue-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">Total Users</p>
                      <h2 className="text-2xl font-bold mt-1">0</h2>
                      <p className="text-green-500 text-xs mt-1">
                        Details
                      </p>
                    </div>
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-xl">
                      <FaUsers />
                    </div>
                  </div>
                </div>

                {/* Total Hosts */}
                <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition border-l-4 border-purple-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">Total Hosts</p>
                      <h2 className="text-2xl font-bold mt-1">0</h2>
                      <p className="text-green-500 text-xs mt-1">
                        Details
                      </p>
                    </div>
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-full text-xl">
                      <FaHotel />
                    </div>
                  </div>
                </div>

                {/* Total Bookings */}
                <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition border-l-4 border-yellow-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">Total Bookings</p>
                      <h2 className="text-2xl font-bold mt-1">0</h2>
                      <p className="text-yellow-500 text-xs mt-1">
                        Details
                      </p>
                    </div>
                    <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full text-xl">
                      <FaBed />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition border-l-4 border-blue-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">Total Pending Hotels</p>
                      <h2 className="text-2xl font-bold mt-1">0</h2>
                      <p className="text-green-500 text-xs mt-1">
                        Details
                      </p>
                    </div>
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-xl">
                      <FaUsers />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition border-l-4 border-purple-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">Total Approved Hotels</p>
                      <h2 className="text-2xl font-bold mt-1">0</h2>
                      <p className="text-green-500 text-xs mt-1">
                        Details
                      </p>
                    </div>
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-full text-xl">
                      <FaHotel />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition border-l-4 border-yellow-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">Total Rejected Hotels</p>
                      <h2 className="text-2xl font-bold mt-1">0</h2>
                      <p className="text-yellow-500 text-xs mt-1">
                        Details
                      </p>
                    </div>
                    <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full text-xl">
                      <FaBed />
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Revenue */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
                  <p className="text-sm opacity-80">Total Revenue</p>
                  <h2 className="text-3xl font-bold mt-2">₹0</h2>
                  <p className="text-sm mt-1">See Details</p>
                </div>

                {/* Rooms */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                  <p className="text-gray-500 text-sm">Available Rooms</p>
                  <h2 className="text-2xl font-bold mt-2">0</h2>
                  <p className="text-blue-500 text-sm mt-1">0 occupied</p>
                </div>
              </div>
            </div>
          )}

          {/* Users */}
          {activeMenu === "users" && (
            <div className="bg-white shadow-xl rounded-xl p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">User Data</h2>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((id) => (
                    <tr key={id} className="text-center">
                      <td className="p-2 border">{id}</td>
                      <td className="p-2 border">User {id}</td>
                      <td className="p-2 border">user{id}@mail.com</td>
                      <td className="p-2 border">
                        {id === 1 ? "Admin" : "User"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Settings */}
          {activeMenu === "settings" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold">Settings Page</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
