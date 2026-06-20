import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Plane,
  Building2,
  MapPin,
  CheckCircle,
  ChevronRight,
} from "lucide-react";


export default function UserLocationSelect() {
  //  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const { booking, setBooking } = useOutletContext();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/locations");

        setLocations(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocations();
  }, []);

  const handleNext = () => {
    navigate("/dashboard/vehicle");
  };



  return (
    <div className="slide-in-from-bottom-4 animate-in duration-500 fade-in">
      <h2 className="bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 mb-2 font-bold text-transparent text-3xl">
        Select Location
      </h2>
      <p className="mb-8 text-slate-500">
        Where do you need parking in Mangalore?
      </p>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        {locations.map((loc) => (
          <div
            key={loc._id}
            onClick={() => setBooking({ ...booking, location: loc })}
            className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white shadow-md ${
              booking.location?._id === loc._id
                ? "border-blue-400 shadow-[0_8px_30px_rgba(59,130,246,0.25)] ring-1 ring-blue-400"
                : "border-slate-200 hover:border-blue-300 hover:shadow-lg"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl ${booking.location?._id === loc._id ? "bg-linear-to-br from-blue-100 to-cyan-100 text-blue-600" : "bg-slate-100 text-slate-500"}`}
                >
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">
                    {loc.name}
                  </h3>
                  <p className="mt-1 text-slate-500 text-sm">
                    {loc.availableSlots} spots available
                  </p>
                </div>
              </div>
              {booking.location?._id === loc._id && (
                <CheckCircle className="w-6 h-6 text-blue-500" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-10">
        <button
          onClick={handleNext}
          disabled={!booking.location}
          className="flex items-center gap-2 bg-linear-to-r from-blue-500 hover:from-blue-600 disabled:from-slate-300 to-cyan-500 hover:to-cyan-600 disabled:to-slate-300 shadow-md hover:shadow-lg px-6 py-3 rounded-xl font-medium text-white disabled:text-slate-500 transition-all"
        >
          Continue <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
