import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AdminUsers() {
  const { searchQuery } = useOutletContext();
  const navigate = useNavigate();
  
  // const allUsers = [
  //   { name: 'Rahul Sharma', email: 'rahul.s@example.com', role: 'Customer', joined: '12 May 2023', status: 'Active' },
  //   { name: 'Sneha Reddy', email: 'sneha.r@example.com', role: 'Customer', joined: '05 Jun 2023', status: 'Active' },
  //   { name: 'Vikram Singh', email: 'vikram.s@example.com', role: 'Customer', joined: '22 Aug 2023', status: 'Inactive' },
  //   { name: 'System Admin', email: 'admin@parkzone.com', role: 'Admin', joined: '01 Jan 2023', status: 'Active' },
  // ];

  const allUsers =[];

  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="mb-6 p-4">
        <h1 className="font-bold bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 text-transparent text-3xl pb-1">
          Users
        </h1>
        <p className="mt-1 text-slate-500">
          Manage your users settings and data here.
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
            <h2 className="font-semibold text-slate-900 text-lg">User Management</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-slate-200 border-b text-slate-500 text-sm">
                <th className="px-4 pb-3 font-medium">Name</th>
                <th className="px-4 pb-3 font-medium">Email</th>
                <th className="px-4 pb-3 font-medium">Role</th>
                <th className="px-4 pb-3 font-medium">Joined</th>
                <th className="px-4 pb-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredUsers.map((user, idx) => (
                <tr key={idx} className="group hover:bg-slate-50 border-slate-50 border-b transition-colors">
                  <td className="px-4 py-4 font-medium text-slate-900">{user.name}</td>
                  <td className="px-4 py-4 text-slate-500">{user.email}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-500">{user.joined}</td>
                  <td className="flex justify-center px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>
                      {user.status}
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
