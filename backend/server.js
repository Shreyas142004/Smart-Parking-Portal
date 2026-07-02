import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import locationRoutes from "./routes/locationRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminBookingRoutes from "./routes/adminBookingRoutes.js";
import adminRevenueRoutes from "./routes/adminRevenueRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

//Auth Routes
app.use('/api/auth', authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/bookings", adminBookingRoutes);
app.use("/api/admin/revenue", adminRevenueRoutes);

app.get('/', (req, res) => {
    res.json({
        message:"Parking Booking backend is running"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});