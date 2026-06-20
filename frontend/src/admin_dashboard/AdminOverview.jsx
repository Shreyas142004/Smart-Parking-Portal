import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Ticket, Users, Car, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function AdminOverview() {
  const navigate = useNavigate();

  const stats = [
    { 
      title: 'Total Revenue', 
      label: 'Revenue',
      value: '₹0', 
      trend: '0%', 
      trendType: 'neutral', 
      icon: CreditCard,
      color: 'from-emerald-400 to-emerald-600',
      bg: 'bg-emerald-50 text-emerald-600',
      link: '/admin/revenue'
    },
    { 
      title: 'Active Bookings', 
      label: 'Booking',
      value: '0', 
      trend: '0%', 
      trendType: 'neutral', 
      icon: Ticket,
      color: 'from-blue-400 to-blue-600',
      bg: 'bg-blue-50 text-blue-600',
      link: '/admin/bookings'
    },
    { 
      title: 'Total Users', 
      label: 'User',
      value: '0', 
      trend: '0%', 
      trendType: 'neutral', 
      icon: Users,
      color: 'from-indigo-400 to-indigo-600',
      bg: 'bg-indigo-50 text-indigo-600',
      link: '/admin/users'
    },
    { 
      title: 'Available Slots', 
      label: 'Location',
      value: '0', 
      trend: '0%', 
      trendType: 'neutral', 
      icon: Car,
      color: 'from-cyan-400 to-cyan-600',
      bg: 'bg-cyan-50 text-cyan-600',
      link: '/admin/locations'
    },
  ];



  return (
    <>
      <div className="p-4">
        <h1 className="font-bold bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 text-transparent text-3xl pb-1">
          Overview
        </h1>
        <p className="mt-1 text-slate-500">
          Here's what's happening in your parking ecosystem today.
        </p>
      </div>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        {stats.map((stat, idx) => (
          <Link 
            to={stat.link}
            key={idx} 
            className="block group relative bg-white shadow-sm hover:shadow-lg p-6 border border-slate-200 hover:border-blue-300 rounded-2xl overflow-hidden transition-all duration-300"
          >
            <div className="z-10 relative flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                stat.trendType === 'up' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                stat.trendType === 'down' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                'bg-slate-50 text-slate-500 border border-slate-200'
              }`}>
                {stat.trendType === 'up' && <TrendingUp className="w-3 h-3" />}
                {stat.trendType === 'down' && <TrendingDown className="w-3 h-3" />}
                {stat.trendType === 'neutral' && <Minus className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div className="z-10 relative flex justify-between items-end">
              <div>
                <h3 className="mb-1 font-medium text-slate-500 text-sm">{stat.title}</h3>
                <p className="font-bold text-slate-900 text-3xl tracking-tight">{stat.value}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-md ${stat.bg}`}>
                {stat.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
