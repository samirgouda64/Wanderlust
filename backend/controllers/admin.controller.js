import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";
import Booking from "../model/booking.model.js";

export const adminDashboard = async (req, res) => {

    try {
        // Total Users
        const totalUsers =
        await User.countDocuments({
            role: "user",
        });

        // Total Hotels
        const totalHotels =
        await Listing.countDocuments();

        // Total Bookings
        const totalBookings =
        await Booking.countDocuments();

        // Pending Hotels
        const pendingHotels =
        await Listing.countDocuments({
            status: "pending",
        });

        // Approved Hotels
        const approvedHotels =
        await Listing.countDocuments({
            status: "approved",
        });

        // Rejected Hotels
        const rejectedHotels =
        await Listing.countDocuments({
            status: "rejected",
        });

        return res.status(200).json({
        success: true,

        stats: {
            totalUsers,
            totalHotels,
            totalBookings,
            pendingHotels,
            approvedHotels,
            rejectedHotels,
        },
        });

    } catch (error) {

        return res.status(500).json({
        success: false,
        message: error.message,
        });

    }
};

export const getAdminListings = async (req, res) => {
  try {

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let search = req.query.search || "";
    let status = req.query.status || "";

    let skip = (page - 1) * limit;

    let query = {};

    // Search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { landMark: { $regex: search, $options: "i" } },
      ];
    }

    // Status Filter
    if (status) {
      query.status = status;
    }

    const total = await Listing.countDocuments(query);

    const listings = await Listing.find(query)
      .populate("host", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      listings,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {

    return res.status(500).json({
      message: `Admin Listing Error ${error}`
    });

  }
};

export const rejectListing = async (req, res) => {

  try {

    let { id } = req.params;

    let { rejectReason } = req.body;

    let listing = await Listing.findByIdAndUpdate(
      id,
      {
        status: "rejected",
        rejectReason,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      listing,
    });

  } catch (error) {

    return res.status(500).json({
      message: `Reject Listing Error ${error}`,
    });

  }
};

export const approveListing = async (req, res) => {

  try {

    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
      id,
      {
        status: "approved",
        rejectReason: "",
        approvedAt: new Date(),
        approvedBy: req.userId,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      listing,
    });

  } catch (error) {

    return res.status(500).json({
      message: `Approve Listing Error ${error}`,
    });

  }
};

export const pendingNotifications = async (req, res) => {

  try {

    const notifications = await Listing.find({
      status: "pending",
      isRead: false,
    })
      .populate("host", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: notifications.length,
      notifications,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: `Notification Error ${error.message}`,
    });

  }
};

export const markNotificationRead = async (req, res) => {

  try {

    const { id } = req.params;

    await Listing.findByIdAndUpdate(
      id,
      {
        isRead: true,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Notification removed",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: `Mark Read Error ${error.message}`,
    });

  }
};