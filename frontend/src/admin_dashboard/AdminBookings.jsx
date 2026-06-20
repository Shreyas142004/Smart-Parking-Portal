import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AdminBookings() {
  const { searchQuery } = useOutletContext();
  const navigate = useNavigate();
  // const [allBookings, setAllBookings] = useState([
  //   { id: '#BKG-8892', user: 'Rahul Sharma', location: 'Forum Fiza Mall', slot: 'A12', status: 'Active', time: '10:00 AM - 02:00 PM', amount: '₹350' },
  //   { id: '#BKG-8891', user: 'Sneha Reddy', location: 'City Centre', slot: 'B04', status: 'Completed', time: '08:30 AM - 11:30 AM', amount: '₹250' },
  //   { id: '#BKG-8890', user: 'Vikram Singh', location: 'Mangalore Airport', slot: 'C22', status: 'Active', time: '01:00 PM - 05:00 PM', amount: '₹500' },
  //   { id: '#BKG-8889', user: 'Anjali Desai', location: 'KSRTC Bus Stand', slot: 'D01', status: 'Pending', time: '04:00 PM - 06:00 PM', amount: '₹150' },
  //   { id: '#BKG-8888', user: 'Rohan Gupta', location: 'Forum Fiza Mall', slot: 'A05', status: 'Cancelled', time: '11:00 AM - 12:00 PM', amount: '₹100' },
  // ]);

  const [allBookings, setAllBookings] = useState([]);

  const filteredBookings = allBookings.filter(b => 
    b.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Active': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      case 'Completed': return 'bg-blue-50 text-blue-600 border border-blue-200';
      case 'Pending': return 'bg-amber-50 text-amber-600 border border-amber-200';
      case 'Cancelled': return 'bg-red-50 text-red-600 border border-red-200';
      default: return 'bg-slate-50 text-slate-600 border border-slate-200';
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
              onClick={() => navigate('/admin/dashboard')}
              className="hover:bg-slate-100 p-2 rounded-lg text-slate-500 transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="font-semibold text-slate-900 text-lg">All Bookings</h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setAllBookings([])}
              className="bg-rose-50 text-rose-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-100 transition-colors"
            >
              Clear All
            </button>
          </div>
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
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredBookings.map((booking, idx) => (
                <tr key={idx} className="group hover:bg-slate-50 border-slate-50 border-b transition-colors">
                  <td className="px-4 py-4 font-mono text-slate-500">{booking.id}</td>
                  <td className="px-4 py-4 font-medium text-slate-900">{booking.user}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-700">{booking.location}</span>
                      <span className="mt-0.5 text-slate-400 text-xs">Slot {booking.slot}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-700">{booking.amount}</td>
                  <td className="flex justify-center px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${getStatusStyle(booking.status)}`}>
                      {booking.status}
                    </span>
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
