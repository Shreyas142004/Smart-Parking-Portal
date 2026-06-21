import Booking from "../models/Booking.js";
import ParkingLocation from "../models/ParkingLocation.js";

export const createBooking = async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);
    const {
      location,
      vehicleType,
      slot,
      startTime,
      endTime,
      paymentMethod,
      upiId,
      paymentStatus,
      transactionId,
    } = req.body;
    const parkingLocation = await ParkingLocation.findById(location);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("OTP:", otp);
    console.log("Parking Location:", parkingLocation);

    if (!parkingLocation) {
      return res.status(404).json({
        message: "Parking location not found",
      });
    }

    const rate =
      vehicleType === "twoWheeler"
        ? parkingLocation.pricePerHour.twoWheeler
        : parkingLocation.pricePerHour.fourWheeler;

    const start = new Date(startTime);
    const end = new Date(endTime);

    console.log("Start:", start);
    console.log("End:", end);

    // const durationHours = Math.ceil((end - start) / (1000 * 60 * 60));
    // const amount = durationHours * rate;

    const durationMinutes = Math.ceil((end - start) / (1000 * 60));

    let amount = 0;

    if (vehicleType === "fourWheeler") {
      if (durationMinutes <= 10) {
        amount = 15;
      } else if (durationMinutes <= 30) {
        amount = 25;
      } else {
        amount = Math.ceil(durationMinutes / 60) * 50;
      }
    } else {
      if (durationMinutes <= 10) {
        amount = 10;
      } else if (durationMinutes <= 30) {
        amount = 15;
      } else {
        amount = Math.ceil(durationMinutes / 60) * 25;
      }
    }

    console.log("Duration Minutes:", durationMinutes);
    console.log("Amount:", amount);
    console.log("User:", req.user._id);
    console.log("Creating booking with:");
    console.log({
      user: req.user._id,
      location,
      vehicleType,
      slot,
      otp,
      startTime,
      endTime,
      amount,
      paymentMethod,
      upiId,
      paymentStatus,
      transactionId,
      
    });

    const existingBooking = await Booking.findOne({
      location,
      slot,
      status: "confirmed",
      startTime: { $lt: end },
      endTime: { $gt: start },
    });
    console.log("Existing Booking:", existingBooking);

    if (existingBooking) {
      return res.status(400).json({
        message: `Slot A${slot.toString().padStart(2, "0")} is already booked`,
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      location,
      vehicleType,
      slot,
      otp,
      startTime,
      endTime,
      amount,
      paymentMethod,
      upiId,
      paymentStatus,
      transactionId,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("BOOKING ERROR FULL:");
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    await Booking.updateMany({
      status: "confirmed",
      endTime: { $lt: new Date() },
    }, {
      $set:{status:"completed"},
    });

    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("location")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("BOOKING ERROR FULL:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// export const getOccupiedSlots = async (req, res) => {
//   try {
//     console.log("Location ID:", req.params.locationId);

//     const bookings = await Booking.find({
//       location: req.params.locationId,
//       status: "confirmed",
//       endTime: { $gt: new Date() },
//     });

//     console.log("Bookings Found:", bookings);

//     const occupiedSlots = bookings.map((booking) => booking.slot);
//     console.log(
//       "Occupied Slots:",
//       bookings.map((booking) => booking.slot),
//     );

//     res.status(200).json(occupiedSlots);
//   } catch (error) {
//     console.error("OCCUPIED SLOT ERROR:");
//     console.error(error);

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

export const getOccupiedSlots = async (req, res) => {
  try {
    console.log("Location ID:", req.params.locationId);

    const { startTime, endTime } = req.query;

    console.log("Query Params:", req.query);

    let query = {
      location: req.params.locationId,
      status: "confirmed",
    };

    if (startTime && endTime) {
      const requestedStart = new Date(startTime);
      const requestedEnd = new Date(endTime);

      query.startTime = { $lt: requestedEnd };
      query.endTime = { $gt: requestedStart };
    } else {
      query.endTime = { $gt: new Date() };
    }

    const bookings = await Booking.find(query);

    console.log("Bookings Found:", bookings);

    const occupiedSlots = bookings.map((booking) => booking.slot);
    console.log(
      "Occupied Slots:",
      bookings.map((booking) => booking.slot),
    );

    res.status(200).json(occupiedSlots);
  } catch (error) {
    console.error("OCCUPIED SLOT ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }
    res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// export const cancelBooking = async (req, res) => {
//   try {
//     console.log("Booking ID:", req.params.id);

//     const booking = await Booking.findById(req.params.id);

//     console.log("Booking Found:", booking);

//     if (!booking) {
//       return res.status(404).json({
//         message: "Booking not found",
//       });
//     }

//     booking.status = "cancelled";

//     await booking.save();

//     res.status(200).json({
//       message: "Booking cancelled successfully",
//       booking,
//     });
//   } catch (error) {
//     console.error("CANCEL ERROR:", error);

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true },
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
