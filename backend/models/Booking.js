import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingLocation",
      required: true,
    },

    vehicleType: {
      type: String,
      enum: ["twoWheeler", "fourWheeler"],
      required: true,
    },
    slot: {
      type: Number,
      required: true,
    },

    otp: {
      type: Number,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed","completed", "cancelled"],
      default: "confirmed",
    },
    paymentMethod:{
      type:String,
      enum:["card","upi"],
      default:"card",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "unpaid"],
      default: "pending",
    },
    transactionId:{
      type:String
    },
    upiId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
