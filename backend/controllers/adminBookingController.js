import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js";

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      // archived:false,
      $or: [{ archived: false }, { archived: { $exists: false } }],
    })
      .populate("user", "name email")
      .populate("location", "name city")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const archiveBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { archived: true },
      { new: true },
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Booking archived successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getArchivedBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ archived: true })
  } catch (error) {}
};
