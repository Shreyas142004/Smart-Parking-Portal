import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Car, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserSlotSelect() {
  const navigate = useNavigate();
  const { booking, setBooking } = useOutletContext();

  const handleNext = () => {
    navigate("/dashboard/checkout");
  };

  const handleBack = () => {
    navigate("/dashboard/time");
  };

  // Generate deterministic occupied slots based on location ID
  const [occupiedSlots, setOccupiedSlots] = useState([]);

  const totalSpots = booking.location?.totalSlots || 24;

  useEffect(() => {
    fetchOccupiedSlots();
  }, [booking.location,
    booking.date,
    booking.startTime,
    booking.endTime
  ]);

  // const fetchOccupiedSlots = async () => {
  //   try {
  //     if (!booking.location?._id) return;

  //     const { data } = await axios.get(
  //       `http://localhost:5000/api/bookings/occupied-slots/${booking.location._id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       },
  //     );

  //     console.log("Occupied Slots:", data);

  //     setOccupiedSlots(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchOccupiedSlots = async () => {
    try {
      if (!booking.location?._id) return;

      const queryParams = new URLSearchParams();

      if(booking.date && booking.startTime && booking.endTime) {
        queryParams.append("startTime", `${booking.date}T${booking.startTime}`);
        queryParams.append("endTime", `${booking.date}T${booking.endTime}`);
      }

      const queryString = queryParams.toString()? `?${queryParams.toString()}` : '';
      const { data } = await axios.get(
        `http://localhost:5000/api/bookings/occupied-slots/${booking.location._id}${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log("Occupied Slots:", data);

      setOccupiedSlots(data)
    } catch (error) {
      console.error(error);
    }
  }
  const handleSlotSelect = (slotNumber) => {
    if (!occupiedSlots.includes(slotNumber)) {
      console.log("Selected Slot:", slotNumber);

      setBooking({
        ...booking,
        slot: slotNumber,
      });
    }
  };
  console.log(booking);

  return (
    <div className="slide-in-from-bottom-4 animate-in duration-500 fade-in">
      <div className="flex sm:flex-row flex-col justify-between sm:items-end gap-4 mb-8">
        <div>
          <h2 className="bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 mb-2 font-bold text-transparent text-3xl">
            Select a Slot
          </h2>
          <p className="text-slate-500">
            Choose an available parking space at{" "}
            {booking.location?.name || "the selected location"}.
          </p>
        </div>
        <div className="flex gap-4 bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 font-medium text-transparent text-sm">
          <div className="flex items-center gap-2">
            <div className="bg-white border-2 border-slate-300 rounded-full w-4 h-4"></div>{" "}
            Available
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-cyan-500 shadow-sm rounded-full w-4 h-4"></div>{" "}
            Selected
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-red-100 border border-red-300 rounded-full w-4 h-4"></div>{" "}
            Occupied
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg mb-10 p-8 lg:p-12 border border-slate-200 rounded-3xl overflow-x-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 mb-8 px-4 py-2 border border-slate-200 rounded-xl w-fit font-medium text-slate-600 hover:text-slate-800 text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to timing
        </button>
        {/* Parking Grid layout */}
        <div className="min-w-150">
          <div className="flex justify-center items-center bg-linear-to-tr from-cyan-500 via-blue-500 to-indigo-500 mb-12 rounded-xl w-full h-12 font-bold text-slate-500 text-white text-sm tracking-[0.2em]">
            DRIVEWAY
          </div>

          <div className="gap-x-8 gap-y-12 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
            {Array.from({ length: totalSpots }).map((_, i) => {
              const slotNum = i + 1;
              const isOccupied = occupiedSlots.includes(slotNum);
              const isSelected = booking.slot === slotNum;

              return (
                <div
                  key={slotNum}
                  onClick={() => handleSlotSelect(slotNum)}
                  className={`relative h-32 rounded-xl flex items-center justify-center text-lg font-bold transition-all ${
                    isOccupied
                      ? "bg-red-50 border-2 border-red-200 text-slate-400 cursor-not-allowed"
                      : isSelected
                        ? "bg-cyan-50 border-2 border-cyan-500 text-cyan-600 shadow-[0_0_15px_rgba(6,182,212,0.2)] scale-105"
                        : "bg-white border-2 border-slate-200 text-slate-400 hover:border-cyan-300 hover:bg-slate-50 cursor-pointer shadow-sm"
                  }`}
                >
                  <div className="top-0 left-1/2 absolute bg-white px-2 border border-slate-200 rounded font-mono text-slate-500 text-xs -translate-x-1/2 -translate-y-1/2">
                    A{slotNum.toString().padStart(2, "0")}
                  </div>
                  {isOccupied && <Car className="w-12 h-12 text-red-300" />}
                  {isSelected && (
                    <Car className="drop-shadow-md w-12 h-12 text-cyan-500" />
                  )}
                  {!isOccupied && !isSelected && (
                    <span className="opacity-40">P</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          // disabled={!booking.slot}
          disabled={false}
          className="flex justify-center items-center gap-2 bg-linear-to-r from-blue-500 hover:from-blue-600 disabled:from-slate-300 to-cyan-500 hover:to-cyan-600 disabled:to-slate-300 shadow-md hover:shadow-lg px-8 py-3.5 rounded-xl font-medium text-white disabled:text-slate-500 transition-all"
        >
          Proceed to Payment <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
