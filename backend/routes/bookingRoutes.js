import express from 'express';
import {
  createBooking,
  getBookings,
  cancelBooking,
  deleteBooking,
  getOccupiedSlots,

} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getBookings);
router.put('/:id/cancel', protect, cancelBooking);
router.delete('/:id', protect, deleteBooking);
router.get("/occupied-slots/:locationId",protect,getOccupiedSlots)

export default router;