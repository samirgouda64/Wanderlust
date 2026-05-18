
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { authDataContext } from "../../Context/AuthContext";
import Sidebar from "../../Component/Admin/Sidebar.jsx";
import Navbar from "../../Component/Admin/Navbar.jsx";
import NotificationsDropdown from "../../Component/Admin/NotificationDropdown.jsx";
import ProfileDropdown from "../../Component/Admin/ProfileDropdown.jsx";
import "../admin/AdminDashboard.css";

const AdminDashboard = () => {
  const { serverUrl } = useContext(authDataContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        serverUrl + "/api/admin/pending-notifications",
        { withCredentials: true }
      );
      setNotifications(res.data.notifications);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        >
          <div ref={notificationRef}>
            <NotificationsDropdown
              notificationOpen={notificationOpen}
              setNotificationOpen={setNotificationOpen}
              notifications={notifications}
              setNotifications={setNotifications}
              setSelectedNotificationId={setSelectedNotificationId}
            />
          </div>

          <div ref={profileRef}>
            <ProfileDropdown
              profileOpen={profileOpen}
              setProfileOpen={setProfileOpen}
            />
          </div>
        </Navbar>

        {/* Page Render Area */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet
            context={{
              selectedNotificationId,
              setSelectedNotificationId,
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;