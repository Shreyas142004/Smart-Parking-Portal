import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function UserSuccess() {
  const { booking, resetBooking } = useOutletContext();

  return (
    <div className="mx-auto mt-10 max-w-lg animate-in duration-500 zoom-in-95 fade-in">
      <div className="bg-white shadow-2xl p-10 border border-slate-200 rounded-3xl text-center">
        <div className="flex justify-center items-center bg-cyan-50 shadow-sm mx-auto mb-6 border border-cyan-100 rounded-full w-24 h-24">
          <CheckCircle className="w-12 h-12 text-cyan-500" />
        </div>
        <h2 className="mb-4 font-bold text-slate-900 text-3xl">Booking Confirmed!</h2>
        <p className="mb-8 text-slate-600 leading-relaxed">
          Your parking spot <strong className="text-cyan-600">A{booking.slot?.toString().padStart(2, '0')}</strong> at <strong className="text-slate-900">{booking.location?.name}</strong> has been successfully reserved. A confirmation email has been sent to you.
        </p>
        
        <div className="bg-slate-50 mb-8 p-4 border border-slate-200 rounded-xl text-sm">
          <div className="flex justify-between mb-2 text-slate-500">
            <span>Date</span>
            <span className="font-medium text-slate-900">{booking.date ? new Date(booking.date).toLocaleDateString() : ''}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Time</span>
            <span className="font-medium text-slate-900">{booking.startTime} - {booking.endTime}</span>
          </div>
        </div>
        
        <button 
          onClick={resetBooking}
          className="flex justify-center items-center gap-2 bg-slate-900 hover:bg-slate-800 shadow-md px-5 py-3.5 rounded-xl w-full font-medium text-white transition-colors"
        >
          Book Another Spot
        </button>
      </div>
    </div>
  );
}
