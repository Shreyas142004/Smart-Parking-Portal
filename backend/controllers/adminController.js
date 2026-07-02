import Booking from "../models/Booking.js";
import User from "../models/User.js";
import ParkingLocation from "../models/ParkingLocation.js";

export const getDashboardStats = async (req, res) => {
  try {
    //revenue
    const revenueResult = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    const activeBooking = await Booking.countDocuments({
      // status: "confirmed",
      // endTime: { $gt: new Date() },
      $or: [{ archived: false }, { archived: { $exists: false } }],
    });

    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const locations = await ParkingLocation.find();

    let totalAvailable = 0;

    locations.forEach((loc) => {
      totalAvailable += loc.availableSlots;
    });

    res.json({
      totalRevenue,
      activeBooking,
      totalUsers,
      availableSlots: totalAvailable,
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:");
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
