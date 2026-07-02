import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAllBookings,archiveBooking } from "../controllers/adminBookingController.js";

const router = express.Router();

router.get("/", protect, getAllBookings);
router.put("/:id/archive", protect, archiveBooking);
router.get("/test", (req, res) => {
  res.send("Admin Booking Route Working");
});

export default router;