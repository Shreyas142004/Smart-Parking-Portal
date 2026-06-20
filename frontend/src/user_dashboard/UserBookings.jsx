import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Ticket,
  MapPin,
  Calendar,
  Clock,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function UserBookings() {
  const navigate = useNavigate();

  // Mock initial bookings
  useEffect(() => {
    fetchBookings();
  }, []);
  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/bookings/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setBookings(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bookings");
    }
  };
  const [bookings, setBookings] = useState([]);

  const handleCancel = async (id) => {
    // Show confirmation toast or just cancel directly
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b)),
      );
      toast.success("Booking cancelled successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking.");
    }
  };

  const handleDelete = async (id) => {
    try{
      await axios.delete(
        `http://localhost:5000/api/bookings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Booking deleted successfully.");

    }catch (error) {
      console.error(error);
      toast.error("Failed to delete booking.");
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-600 border-green-200";

      case "cancelled":
        return "bg-red-50 text-red-600 border-red-200";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="slide-in-from-bottom-4 animate-in duration-500 fade-in max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 font-bold text-transparent text-3xl mb-2">
            My Bookings
          </h2>
          <p className="text-slate-500">
            View and manage your parking reservations.
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/location")}
          className="flex items-center gap-2 bg-white hover:bg-slate-50 px-4 py-2 border border-slate-200 rounded-xl font-medium text-slate-600 hover:text-slate-800 text-sm transition-colors shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" /> New Booking
        </button>
      </div>

      <div className="space-y-6">
        {bookings.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
            <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No Bookings Found
            </h3>
            <p className="text-slate-500 mb-6">
              You haven't made any parking reservations yet.
            </p>
            <button
              onClick={() => navigate("/dashboard/location")}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Book a Spot
            </button>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id.slice(-6)}
              className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between transition-all hover:shadow-md"
            >
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-500 text-sm font-medium bg-slate-100 px-3 py-1 rounded-md">
                    Slot A{booking.slot?.toString().padStart(2, "0")}
                  </span>
                  <span
                    className={`px-3 py-1 border rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}
                  >
                    {booking.status === "confirmed"
                      ? "Active"
                      : booking.status === "cancelled"
                        ? "Cancelled"
                        : booking.status}
                  </span>
                  <p className="text-sm font-semibold text-purple-600">
                    OTP: {booking.otp}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">
                        {booking.location?.name}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        Slot A{booking.slot?.toString().padStart(2, "0")} •{" "}
                        {booking.vehicleType === "twoWheeler"
                          ? "2 Wheeler"
                          : "4 Wheeler"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">
                        {new Date(booking.startTime).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </p>
                      <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{" "}
                        {new Date(booking.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {" - "}
                        {new Date(booking.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      <p className="text-xs text-slate-400">
                        Booked on{" "}
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 shrink-0">
                <div className="text-left md:text-right">
                  <p className="text-xs text-slate-500 font-medium mb-1">
                    Total Paid
                  </p>
                  <p className="text-xl font-bold text-cyan-600">
                    ₹{booking.amount}
                  </p>
                </div>

                {booking.status === "confirmed" && (
                  <button
                    onClick={() => {
                      toast((t) => (
                        <div className="flex flex-col gap-3">
                          <p>Cancel this booking?</p>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                handleCancel(booking._id);
                                toast.dismiss(t.id);
                              }}
                              className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                              Yes
                            </button>

                            <button
                              onClick={() => toast.dismiss(t.id)}
                              className="bg-gray-200 px-3 py-1 rounded"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ));
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel
                  </button>
                )}
                <button
                onClick={() => handleDelete(booking._id)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
              >
                Delete
              </button>
              </div>
              
            </div>

            
          ))
        )}
      </div>
    </div>
  );
}
