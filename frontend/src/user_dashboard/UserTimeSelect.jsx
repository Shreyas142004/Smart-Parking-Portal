import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

export default function UserTimeSelect() {
  const navigate = useNavigate();
  const { booking, setBooking } = useOutletContext();

  const handleNext = () => {
    const start = new Date(`2000-01-01T${booking.startTime}`);
    const end = new Date(`2000-01-01T${booking.endTime}`);

    const hours = (end - start) / (1000 * 60 * 60);

    setBooking({
      ...booking,
      duration: hours,
    });
    navigate("/dashboard/slot");
  };

  const handleBack = () => {
    navigate("/dashboard/vehicle");
  };

  const todayDateObj = new Date();
  const todayDateString = `${todayDateObj.getFullYear()}-${String(todayDateObj.getMonth() + 1).padStart(2, "0")}-${String(todayDateObj.getDate()).padStart(2, "0")}`;

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate && selectedDate < todayDateString) {
      toast.error("You cannot select a past date.");
      setBooking({ ...booking, date: "" });
      return;
    }

    let newBooking = { ...booking, date: selectedDate };
    if (selectedDate === todayDateString) {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, "0");
      const currentMinutes = String(now.getMinutes()).padStart(2, "0");
      const currentTime = `${currentHours}:${currentMinutes}`;

      let cleared = false;
      if (newBooking.startTime && newBooking.startTime < currentTime) {
        newBooking.startTime = "";
        cleared = true;
      }
      if (newBooking.endTime && newBooking.endTime < currentTime) {
        newBooking.endTime = "";
        cleared = true;
      }
      if (cleared) {
        toast.error("Past times were cleared for today's date.");
      }
    }

    setBooking(newBooking);
  };

  const handleStartTimeChange = (e) => {
    const selectedTime = e.target.value;
    if (booking.date === todayDateString) {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, "0");
      const currentMinutes = String(now.getMinutes()).padStart(2, "0");
      const currentTime = `${currentHours}:${currentMinutes}`;
      if (selectedTime && selectedTime < currentTime) {
        toast.error("You cannot select a past time.");
        setBooking({ ...booking, startTime: "" });
        return;
      }
    }

    if (booking.endTime && selectedTime) {
      const start = new Date(`2000-01-01T${selectedTime}`);
      const end = new Date(`2000-01-01T${booking.endTime}`);
      const diffMins = (end - start) / 60000;
      if (diffMins < 5) {
        toast.error("End time must be at least 5 minutes after start time.");
        setBooking({ ...booking, startTime: selectedTime, endTime: "" });
        return;
      }
    }

    setBooking({ ...booking, startTime: selectedTime });
  };

  const handleEndTimeChange = (e) => {
    const selectedTime = e.target.value;
    if (booking.date === todayDateString) {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, "0");
      const currentMinutes = String(now.getMinutes()).padStart(2, "0");
      const currentTime = `${currentHours}:${currentMinutes}`;
      if (selectedTime && selectedTime < currentTime) {
        toast.error("You cannot select a past time.");
        setBooking({ ...booking, endTime: "" });
        return;
      }
    }

    if (booking.startTime && selectedTime) {
      const start = new Date(`2000-01-01T${booking.startTime}`);
      const end = new Date(`2000-01-01T${selectedTime}`);
      const diffMins = (end - start) / 60000;
      if (diffMins < 5) {
        toast.error("End time must be at least 5 minutes after start time.");
        setBooking({ ...booking, endTime: "" });
        return;
      }
    }

    setBooking({ ...booking, endTime: selectedTime });
  };

  return (
    <div className="slide-in-from-bottom-4 animate-in duration-500 fade-in">
      <h2 className="bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 mb-2 font-bold text-transparent text-3xl">
        When do you need it?
      </h2>
      <p className="mb-8 text-slate-500">
        Select your arrival and departure times for{" "}
        {booking.location?.name || "the selected location"}.
      </p>
      <div className="bg-white shadow-lg mx-auto p-8 border border-slate-200 rounded-3xl max-w-2xl">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 mb-6 px-4 py-2 border border-slate-200 rounded-xl w-fit font-medium text-slate-600 hover:text-slate-800 text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to locations
        </button>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 font-medium text-slate-700 text-transparent text-sm">
              Date
            </label>
            <div className="relative">
              <Calendar className="top-1/2 left-4 absolute w-5 h-5 text-slate-400 -translate-y-1/2" />
              <input
                type="date"
                value={booking.date}
                min={todayDateString}
                onChange={handleDateChange}
                className="bg-slate-50 py-3.5 pr-4 pl-12 border border-slate-200 focus:border-cyan-500 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 w-full text-slate-900 transition-all"
              />
            </div>
          </div>

          <div className="gap-6 grid grid-cols-2">
            <div className="space-y-2">
              <label className="bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 font-medium text-slate-700 text-transparent text-sm">
                Start Time
              </label>
              <div className="relative">
                <Clock className="top-1/2 left-4 absolute w-5 h-5 text-slate-400 -translate-y-1/2" />
                <input
                  type="time"
                  value={booking.startTime || ""}
                  onChange={handleStartTimeChange}
                  className="bg-slate-50 py-3.5 pr-4 pl-12 border border-slate-200 focus:border-cyan-500 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 w-full text-slate-900 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 font-medium text-slate-700 text-transparent text-sm">
                End Time
              </label>
              <div className="relative">
                <Clock className="top-1/2 left-4 absolute w-5 h-5 text-slate-400 -translate-y-1/2" />
                <input
                  type="time"
                  value={booking.endTime || ""}
                  onChange={handleEndTimeChange}
                  className="bg-slate-50 py-3.5 pr-4 pl-12 border border-slate-200 focus:border-cyan-500 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500/20 w-full text-slate-900 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-10 pt-8 border-slate-100 border-t">
          <button
            onClick={handleNext}
            disabled={!booking.date || !booking.startTime || !booking.endTime}
            className="flex justify-center items-center gap-2 bg-linear-to-r from-blue-500 hover:from-blue-600 disabled:from-slate-300 to-cyan-500 hover:to-cyan-600 disabled:to-slate-300 shadow-md hover:shadow-lg px-8 py-3.5 rounded-xl w-full sm:w-auto font-medium text-white disabled:text-slate-500 transition-all"
          >
            Check Availability <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
