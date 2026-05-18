import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaUsers, FaHotel, FaBed, FaBell } from "react-icons/fa";
import { authDataContext } from "../../Context/AuthContext";

const DashboardPage = () => {
  const { serverUrl } = useContext(authDataContext);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHotels: 0,
    totalBookings: 0,
    pendingHotels: 0,
    approvedHotels: 0,
    rejectedHotels: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(serverUrl + "/api/admin/adminDashboard", {
        withCredentials: true,
      });
      setStats(res.data.stats);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="dashboard-cards">
        {/* Users */}
        <div className="dashboard-card users-card">
          <div className="card-glow"></div>

          <div className="card-content">
            <div>
              <p className="card-title">Total Users</p>

              <h2 className="card-count">{stats.totalUsers}</h2>

              <span className="card-badge blue-badge">Active Users</span>
            </div>

            <div className="card-icon blue-icon">
              <FaUsers />
            </div>
          </div>
        </div>

        {/* Hotels */}
        <div className="dashboard-card purple-card">
          <div className="card-glow"></div>

          <div className="card-content">
            <div>
              <p className="card-title">Total Hotels</p>

              <h2 className="card-count">{stats.totalHotels}</h2>

              <span className="card-badge purple-badge">Hotel Listings</span>
            </div>

            <div className="card-icon purple-icon">
              <FaHotel />
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className="dashboard-card yellow-card">
          <div className="card-glow"></div>

          <div className="card-content">
            <div>
              <p className="card-title">Total Bookings</p>

              <h2 className="card-count">{stats.totalBookings}</h2>

              <span className="card-badge yellow-badge">Reservations</span>
            </div>

            <div className="card-icon yellow-icon">
              <FaBed />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="dashboard-card red-card">
          <div className="card-glow"></div>

          <div className="card-content">
            <div>
              <p className="card-title">Pending Hotels</p>

              <h2 className="card-count">{stats.pendingHotels}</h2>

              <span className="card-badge red-badge">Waiting Approval</span>
            </div>

            <div className="card-icon red-icon">
              <FaBell />
            </div>
          </div>
        </div>

        {/* Approved */}
        <div className="dashboard-card green-card">
          <div className="card-glow"></div>

          <div className="card-content">
            <div>
              <p className="card-title">Approved Hotels</p>

              <h2 className="card-count">{stats.approvedHotels}</h2>

              <span className="card-badge green-badge">Verified Hotels</span>
            </div>

            <div className="card-icon green-icon">
              <FaHotel />
            </div>
          </div>
        </div>

        {/* Rejected */}
        <div className="dashboard-card orange-card">
          <div className="card-glow"></div>

          <div className="card-content">
            <div>
              <p className="card-title">Rejected Hotels</p>

              <h2 className="card-count">{stats.rejectedHotels}</h2>

              <span className="card-badge orange-badge">Rejected Requests</span>
            </div>

            <div className="card-icon orange-icon">
              <FaHotel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
