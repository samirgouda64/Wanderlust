import React, { useRef } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";
import { authDataContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const NotificationsDropdown = ({
  notificationOpen,
  setNotificationOpen,
  notifications,
  setNotifications,
  setActiveMenu,
  setSelectedNotificationId,
}) => {
  const notificationRef = useRef(null);
  const { serverUrl } = React.useContext(authDataContext);
  const navigate = useNavigate();

  return (
    <div className="relative" ref={notificationRef}>
      {/* Bell Button */}
      <button
        onClick={() => setNotificationOpen(!notificationOpen)}
        className="relative bg-white border rounded-full p-3 shadow hover:bg-gray-100 transition"
      >
        <FaBell className="text-gray-700 text-lg" />

        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {notificationOpen && (
        <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-2xl border z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white px-5 py-3 font-semibold">
            Hotel Notifications
          </div>

          {/* Body */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <div
                  key={item._id}
                  onClick={async () => {
                    try {
                      await axios.put(
                        serverUrl +
                          `/api/admin/mark-notification-read/${item._id}`,
                        {},
                        { withCredentials: true },
                      );

                      setNotifications((prev) =>
                        prev.filter((n) => n._id !== item._id),
                      );

                      setSelectedNotificationId(item._id);
                      navigate("/admin/listings");
                      setNotificationOpen(false);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  className="border-b px-5 py-4 hover:bg-gray-50 transition cursor-pointer"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        New hotel listing request from{" "}
                        <span className="font-medium">{item.host?.name}</span>
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                      Pending
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No Notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
