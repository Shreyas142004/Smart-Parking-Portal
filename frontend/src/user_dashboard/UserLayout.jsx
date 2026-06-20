import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Car, LogOut, CheckCircle } from 'lucide-react';

export default function UserLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  // const user=JSON.parse(localStorage.getItem('user'));
  
  // Shared booking state for the wizard
  const [booking, setBooking] = useState({
    location: null,
    vehicleType: '',
    date: '',
    startTime: '',
    endTime: '',
    slot: null,
    price: 0
  });

  const resetBooking = () => {
    setBooking({ location: null, vehicleType: '', date: '', startTime: '', endTime: '', slot: null, price: 0 });
    navigate('/dashboard/location');
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Determine current step based on path
  const path = location.pathname;
  let step = 1;
  if (path.includes('/dashboard/location')) step = 1;
  else if (path.includes('/dashboard/time')) step = 2;
  else if (path.includes('/dashboard/slot')) step = 3;
  else if (path.includes('/dashboard/checkout')) step = 4;
  else if (path.includes('/dashboard/success')) step = 5;

  return (
    <div className="selection:bg-cyan-500/30 bg-linear-to-r from-[#e0e8ff] to-[#cff3fa] pb-12 min-h-screen font-sans text-slate-900">
      {/* Top Navbar */}
      <nav className="top-0 z-50 sticky bg-white/80 shadow-sm backdrop-blur-xl border-slate-200 border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={resetBooking}>
              <img src="/logo.svg" alt="ParkZone Logo" className="w-10 h-10 object-contain" />
              <span className="font-bold text-slate-900 text-xl tracking-wide">ParkZone</span>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="hidden sm:block text-slate-600 text-sm">Welcome, User</span>
              <button 
                onClick={() => navigate('/dashboard/bookings')}
                className="flex items-center gap-2 bg-cyan-50 hover:bg-cyan-100 shadow-sm px-4 py-2 border border-cyan-200 rounded-xl font-medium text-cyan-700 text-sm transition-colors"
              >
                <CheckCircle className="w-4 h-4 hidden sm:block" />
                <span>My Bookings</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white hover:bg-slate-50 shadow-sm px-4 py-2 border border-slate-200 rounded-xl font-medium text-slate-700 text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content Area */}
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-5xl">
        
        
        <Outlet context={{ booking, setBooking, resetBooking }} />
      </main>
    </div>
  );
}
