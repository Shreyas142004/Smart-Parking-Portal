import ParkingLocation from "../models/ParkingLocation.js";

//get all locations
export const getLocations = async (req, res) => {
  try {
    const locations = await ParkingLocation.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// CREATE LOCATION
export const createLocation = async (req, res) => {
  try {
    const { 
        name, 
        address, 
        city, 
        pricePerHour, 
        totalSlots, 
        availableSlots
     }
    = req.body;

    const location = await ParkingLocation.create({
      name,
      address,
      city,
      pricePerHour,
      totalSlots,
      availableSlots,
    });

    res.status(201).json({
      message: "Location created successfully",
      location,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
