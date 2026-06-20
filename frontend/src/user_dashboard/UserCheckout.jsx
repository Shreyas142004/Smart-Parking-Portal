import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  MapPin,
  Calendar,
  CreditCard,
  ChevronLeft,
  Lock,
  Smartphone,
} from "lucide-react";
import { toast } from "react-hot-toast";



export default function UserCheckout() {
  const navigate = useNavigate();
  const { booking } = useOutletContext();
  const handleNext = () => {
    navigate("/dashboard/success");
  };

  const handleBack = () => {
    navigate("/dashboard/slot");
  };
  const [paymentMethod, setPaymentMethod] = useState("card");

  const start = new Date(`${booking.date}T${booking.startTime}`);
  const end = new Date(`${booking.date}T${booking.endTime}`);

  const duration = Math.max(0,(end - start) / (1000 * 60 * 60));

  const rate =
    booking.vehicleType === "twoWheeler"
      ? booking.location?.pricePerHour?.twoWheeler
      : booking.location?.pricePerHour?.fourWheeler;

  const parkingFee = duration * rate;
  const serviceTax = Math.round(parkingFee * 0.18);
  const totalAmount = parkingFee + serviceTax;

  const handleBooking = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          location: booking.location._id,
          vehicleType: booking.vehicleType,
          slot: booking.slot,
          startTime: `${booking.date}T${booking.startTime}`,
          endTime: `${booking.date}T${booking.endTime}`,

          paymentMethod,
          paymentStatus: "pending",
          transactionId: `TXN$${Date.now()+Math.floor(Math.random() * 1000)}`,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      navigate("/dashboard/success");
    } catch (error) {

      console.log(error.response?.data);
      console.log(error);
      toast.error(
        error.response?.data?.message || "Booking failed",
      );
    }
  };

  return (
    <div className="slide-in-from-bottom-4 animate-in duration-500 fade-in">
      <h2 className="bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 mb-8 font-bold text-transparent text-3xl">
        Checkout
      </h2>
      <div className="gap-8 grid grid-cols-1 lg:grid-cols-5">
        {/* Order Summary */}
        <div className="order-2 lg:order-1 lg:col-span-2">
          <div className="bg-white shadow-md p-6 border border-slate-200 rounded-3xl">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 mb-6 px-4 py-2 border border-slate-200 rounded-xl w-fit font-medium text-slate-600 hover:text-slate-800 text-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back to slot selection
            </button>
            <h3 className="mb-6 font-semibold text-slate-900 text-xl">
              Booking Summary
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 text-slate-700">
                <MapPin className="mt-0.5 w-5 h-5 text-cyan-500 shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">
                    {booking.location?.name || "Selected Location"}
                  </p>
                  <p className="mt-1 text-slate-500">
                    Slot A{booking.slot?.toString().padStart(2, "0")}
                    {booking.vehicleType &&
                      ` • ${booking.vehicleType === "twoWheeler" ? "2 Wheeler" : "4 Wheeler"}`}
                  </p>
                </div>
              </div>

              <div className="bg-slate-100 my-4 w-full h-px"></div>

              <div className="flex items-start gap-3 text-slate-700">
                <Calendar className="mt-0.5 w-5 h-5 text-blue-500 shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">
                    {booking.date
                      ? new Date(booking.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Select Date"}
                  </p>
                  <p className="mt-1 text-slate-500">
                    {booking.startTime || "--:--"} to{" "}
                    {booking.endTime || "--:--"}
                  </p>
                  <p className="mt-1 text-slate-500">
                    Duration: {duration} Hours
                  </p>

                  <p className="mt-1 text-slate-500">Rate: ₹{rate}/Hour</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 my-6 w-full h-px"></div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Parking Fee</span>
                <span>₹{parkingFee}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Service Tax</span>
                <span>₹{serviceTax}</span>
              </div>
              <div className="flex justify-between mt-3 pt-3 border-slate-100 border-t font-bold text-slate-900 text-lg">
                <span>Total</span>
                <span className="text-cyan-600">₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="order-1 lg:order-2 lg:col-span-3">
          <div className="bg-white shadow-lg p-8 border border-slate-200 rounded-3xl">
            <h3 className="flex items-center gap-2 mb-6 font-semibold text-slate-900 text-xl">
              {paymentMethod === "card" ? (
                <CreditCard className="w-5 h-5 text-cyan-500" />
              ) : (
                <Smartphone className="w-5 h-5 text-cyan-500" />
              )}
              Payment Details
            </h3>

            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 py-2 rounded-xl border font-medium text-sm transition-all ${paymentMethod === "card" ? "bg-cyan-50 border-cyan-500 text-cyan-700" : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"}`}
              >
                Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`flex-1 py-2 rounded-xl border font-medium text-sm transition-all ${paymentMethod === "upi" ? "bg-cyan-50 border-cyan-500 text-cyan-700" : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"}`}
              >
                UPI
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleBooking();
              }}
            >
              {paymentMethod === "card" ? (
                <>
                  <div className="space-y-1.5">
                    <label className="ml-1 font-medium text-slate-700 text-sm">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      className="block bg-slate-50 p-3.5 border border-slate-200 focus:border-cyan-500 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 w-full text-slate-900 text-sm transition-all"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="ml-1 font-medium text-slate-700 text-sm">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        pattern="\d{16}"
                        maxLength="16"
                        className="block bg-slate-50 p-3.5 pl-11 border border-slate-200 focus:border-cyan-500 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 w-full text-slate-900 text-sm tracking-widest transition-all"
                        placeholder="0000 0000 0000 0000"
                      />
                      <CreditCard className="top-1/2 left-3.5 absolute w-5 h-5 text-slate-400 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="gap-5 grid grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="ml-1 font-medium text-slate-700 text-sm">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="block bg-slate-50 p-3.5 border border-slate-200 focus:border-cyan-500 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 w-full text-slate-900 text-sm transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="ml-1 font-medium text-slate-700 text-sm">
                        CVC
                      </label>
                      <input
                        type="password"
                        maxLength="3"
                        placeholder="•••"
                        className="block bg-slate-50 p-3.5 border border-slate-200 focus:border-cyan-500 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 w-full text-slate-900 text-sm tracking-widest transition-all"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-1.5">
                  <label className="ml-1 font-medium text-slate-700 text-sm">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    className="block bg-slate-50 p-3.5 border border-slate-200 focus:border-cyan-500 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 w-full text-slate-900 text-sm transition-all"
                    placeholder="example@upi"
                    required={paymentMethod === "upi"}
                  />
                  <p className="ml-1 mt-1 text-slate-500 text-xs">
                    A payment request will be sent to this UPI ID.
                  </p>
                </div>
              )}

              <div className="pt-6">
                <button
                  type="submit"
                  className="flex justify-center items-center gap-2 bg-linear-to-r from-blue-500 hover:from-blue-600 to-cyan-500 hover:to-cyan-600 shadow-[0_4_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6_20px_rgba(59,130,246,0.23)] px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full font-bold text-white text-lg active:scale-[0.98] transition-all"
                >
                  Pay ₹{totalAmount}
                </button>
                <p className="flex justify-center items-center gap-1 mt-4 text-slate-500 text-xs text-center">
                  <Lock className="w-3 h-3" /> Secure, mock payment processing
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
