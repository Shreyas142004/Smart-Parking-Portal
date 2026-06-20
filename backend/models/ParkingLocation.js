import mongoose from "mongoose";

const parkingLocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    pricePerHour: {
      twoWheeler: {
        type: Number,
        required: true,
      },
      fourWheeler: {
        type: Number,
        required: true,
      },
    },

    totalSlots: {
      type: Number,
      required: true,
    },

    availableSlots: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ParkingLocation = mongoose.model(
  "ParkingLocation",
  parkingLocationSchema,
);

export default ParkingLocation;
