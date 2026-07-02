import Booking from "../models/Booking.js";

export const getRevenue = async(req,res)=>{
    try {
        const bookings = await Booking.find({
            paymentStatus:"paid"
        })
        .populate("user","name email")
        .populate("location","name city")
        .sort({createdAt:-1})

        const totalRevenue = bookings.reduce(
            (sum,booking)=> sum+booking.amount,0
        )

        res.status(200).json({
            totalRevenue,
            bookings
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}