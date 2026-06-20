import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Car, Bike, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const VEHICLES = [
  {
    id: 'twoWheeler',
    name: '2 Wheeler',
    icon: Bike,
    desc: 'Motorcycles, Scooters'
  },
  {
    id: 'fourWheeler',
    name: '4 Wheeler',
    icon: Car,
    desc: 'Cars, SUVs, Vans'
  }
];

export default function UserVehicleSelect() {
  const navigate = useNavigate();
  const { booking, setBooking } = useOutletContext();

  const handleNext = () => {
    navigate('/dashboard/time');
  };

  const handleBack = () => {
    navigate('/dashboard/location');
  };

  return (
    <div className="slide-in-from-bottom-4 animate-in duration-500 fade-in">
      <h2 className="bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 mb-2 font-bold text-transparent text-3xl">Select Vehicle Type</h2>
      <p className="mb-8 text-slate-500">What type of vehicle will you be parking?</p>
      
      <div className="bg-white shadow-lg mx-auto p-8 border border-slate-200 rounded-3xl max-w-2xl">
        <button onClick={handleBack} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 mb-6 px-4 py-2 border border-slate-200 rounded-xl w-fit font-medium text-slate-600 hover:text-slate-800 text-sm transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to locations
        </button>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
          {VEHICLES.map((v) => (
            <div 
              key={v.id}
              onClick={() => setBooking({ ...booking, vehicleType: v.id })}
              className={`relative p-6 rounded-2xl border transition-all cursor-pointer bg-white flex flex-col items-center text-center ${
                booking.vehicleType === v.id 
                  ? 'border-blue-400 shadow-[0_8px_30px_rgba(59,130,246,0.25)] ring-1 ring-blue-400' 
                  : 'border-slate-200 hover:border-blue-300 hover:shadow-lg'
              }`}
            >
              <div className="absolute top-4 right-4">
                {booking.vehicleType === v.id && (
                  <CheckCircle className="w-6 h-6 text-blue-500" />
                )}
              </div>
              <div className={`p-4 rounded-full mb-4 ${booking.vehicleType === v.id ? 'bg-linear-to-br from-blue-100 to-cyan-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                <v.icon className="w-10 h-10" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">{v.name}</h3>
              <p className="mt-2 text-slate-500 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end mt-10 pt-8 border-slate-100 border-t">
          <button 
            onClick={handleNext}
            disabled={!booking.vehicleType}
            className="flex justify-center items-center gap-2 bg-linear-to-r from-blue-500 hover:from-blue-600 disabled:from-slate-300 to-cyan-500 hover:to-cyan-600 disabled:to-slate-300 shadow-md hover:shadow-lg px-8 py-3.5 rounded-xl w-full sm:w-auto font-medium text-white disabled:text-slate-500 transition-all"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
