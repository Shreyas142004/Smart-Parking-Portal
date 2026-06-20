import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AdminLocations() {
  const { searchQuery } = useOutletContext();
  const navigate = useNavigate();
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationCapacity, setNewLocationCapacity] = useState('');
  const [allLocations, setAllLocations] = useState([]);

  const filteredLocations = allLocations.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddLocation = (e) => {
    e.preventDefault();
    if (!newLocationName || !newLocationCapacity) return;
    
    setAllLocations([
      ...allLocations,
      {
        name: newLocationName,
        totalSpots: parseInt(newLocationCapacity),
        occupied: 0,
        status: 'Active'
      }
    ]);
    
    setNewLocationName('');
    setNewLocationCapacity('');
    setIsAddLocationModalOpen(false);
  };

  return (
    <>
      <div className="mb-6 p-4">
        <h1 className="font-bold bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 text-transparent text-3xl pb-1">
          Locations
        </h1>
        <p className="mt-1 text-slate-500">
          Manage your locations settings and data here.
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
            <h2 className="font-semibold text-slate-900 text-lg">Parking Locations</h2>
          </div>
          <button 
            onClick={() => setIsAddLocationModalOpen(true)}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-600 transition-colors"
          >
            + Add Location
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-slate-200 border-b text-slate-500 text-sm">
                <th className="px-4 pb-3 font-medium">Location Name</th>
                <th className="px-4 pb-3 font-medium">Capacity (Occupied / Total)</th>
                <th className="px-4 pb-3 font-medium">Occupancy %</th>
                <th className="px-4 pb-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredLocations.map((loc, idx) => {
                const occupancy = Math.round((loc.occupied / loc.totalSpots) * 100);
                return (
                  <tr key={idx} className="group hover:bg-slate-50 border-slate-50 border-b transition-colors">
                    <td className="px-4 py-4 font-medium text-slate-900">{loc.name}</td>
                    <td className="px-4 py-4 text-slate-600">{loc.occupied} / {loc.totalSpots}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-slate-100 rounded-full w-24 h-2 overflow-hidden">
                          <div 
                            className={`h-full ${occupancy > 90 ? 'bg-rose-500' : occupancy > 70 ? 'bg-amber-400' : 'bg-emerald-400'}`} 
                            style={{ width: `${occupancy}%` }}
                          ></div>
                        </div>
                        <span className="font-medium text-slate-500 text-xs">{occupancy}%</span>
                      </div>
                    </td>
                    <td className="flex justify-center px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                        loc.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 
                        loc.status === 'Full' ? 'bg-rose-50 text-rose-600 border border-rose-200' :
                        'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}>
                        {loc.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add Location Modal */}
      {isAddLocationModalOpen && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-md animate-in duration-200 zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-slate-900 text-xl">Add New Location</h2>
              <button 
                onClick={() => setIsAddLocationModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl leading-none transition-colors"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddLocation} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-slate-700 text-sm">Location Name</label>
                <input 
                  type="text" 
                  value={newLocationName}
                  onChange={(e) => setNewLocationName(e.target.value)}
                  placeholder="e.g. City Centre Mall"
                  className="px-4 py-2 border border-slate-200 focus:border-cyan-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 w-full transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-slate-700 text-sm">Total Capacity</label>
                <input 
                  type="number" 
                  value={newLocationCapacity}
                  onChange={(e) => setNewLocationCapacity(e.target.value)}
                  placeholder="e.g. 150"
                  min="1"
                  className="px-4 py-2 border border-slate-200 focus:border-cyan-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 w-full transition-colors"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsAddLocationModalOpen(false)}
                  className="flex-1 hover:bg-slate-50 px-4 py-2 border border-slate-200 rounded-xl font-medium text-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/20 shadow-sm px-4 py-2 rounded-xl font-medium text-white transition-colors"
                >
                  Add Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}