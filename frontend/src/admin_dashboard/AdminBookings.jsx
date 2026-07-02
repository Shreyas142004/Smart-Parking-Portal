import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

export default function AdminBookings() {
  const { searchQuery } = useOutletContext();
  const navigate = useNavigate();

  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/bookings",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log("response", data);
      const formattedBookings = data.map((booking) => ({
        id: booking._id,
        user: booking.user?.name || "Unknown User",
        location: booking.location?.name || "Unknown Location",
        slot: `A${booking.slot.toString().padStart(2, "0")}`,
        status:
          booking.status === "confirmed"
            ? "Active"
            : booking.status === "completed"
              ? "Completed"
              : booking.status === "cancelled"
                ? "Cancelled"
                : "Pending",
        time: `${new Date(booking.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${new Date(booking.endTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
        amount: `₹${booking.amount}`,
      }));

      setAllBookings(formattedBookings);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bookings");
    }
  };
  const archiveBooking = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/bookings/${id}/archive`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      // Refresh bookings after archiving
      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredBookings = allBookings.filter(
    (b) =>
      (b.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.user || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.location || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.status || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200";
      case "Completed":
        return "bg-blue-50 text-blue-600 border border-blue-200";
      case "Pending":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      case "Cancelled":
        return "bg-red-50 text-red-600 border border-red-200";
      default:
        return "bg-slate-50 text-slate-600 border border-slate-200";
    }
  };

  return (
    <>
      <div className="mb-6 p-4">
        <h1 className="font-bold bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 text-transparent text-3xl pb-1">
          Bookings
        </h1>
        <p className="mt-1 text-slate-500">
          Manage your bookings settings and data here.
        </p>
      </div>
      <div className="flex flex-col bg-white shadow-sm p-6 border border-slate-200 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="hover:bg-slate-100 p-2 rounded-lg text-slate-500 transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="font-semibold text-slate-900 text-lg">
              All Bookings
            </h2>
          </div>
          {/* <div className="flex items-center gap-3">
            <button
              onClick={() => setAllBookings([])}
              className="bg-rose-50 text-rose-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-100 transition-colors"
            >
              Clear All
            </button>
          </div> */}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-slate-200 border-b text-slate-500 text-sm">
                <th className="px-4 pb-3 font-medium">Booking ID</th>
                <th className="px-4 pb-3 font-medium">Customer</th>
                <th className="px-4 pb-3 font-medium">Location & Slot</th>
                <th className="px-4 pb-3 font-medium">Amount</th>
                <th className="px-4 pb-3 font-medium text-center">Status</th>
                <th className="px-4 pb-3 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredBookings.map((booking, idx) => (
                <tr
                  key={idx}
                  className="group hover:bg-slate-50 border-slate-50 border-b transition-colors"
                >
                  <td className="px-4 py-4 font-mono text-slate-500">
                    {booking.id}
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {booking.user}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-700">{booking.location}</span>
                      <span className="mt-0.5 text-slate-400 text-xs">
                        Slot {booking.slot}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-700">
                    {booking.amount}
                  </td>
                  <td className="flex justify-center px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${getStatusStyle(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => archiveBooking(booking.id)}
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-white text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
