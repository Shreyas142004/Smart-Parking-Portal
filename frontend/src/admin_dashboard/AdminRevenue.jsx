import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X } from 'lucide-react';

export default function AdminRevenue() {
  const { searchQuery } = useOutletContext();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([
    // { id: '#TXN-1001', user: 'Rahul Sharma', amount: '₹350', method: 'UPI', status: 'Pending' },
    // { id: '#TXN-1002', user: 'Sneha Reddy', amount: '₹250', method: 'Card', status: 'Accepted' },
    // { id: '#TXN-1003', user: 'Vikram Singh', amount: '₹500', method: 'UPI', status: 'Pending' },
    // { id: '#TXN-1004', user: 'Anjali Desai', amount: '₹150', method: 'Card', status: 'Cancelled' },
  ]);

  const filteredTransactions = transactions.filter(t => 
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAccept = (id) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, status: 'Accepted' } : t));
  };

  const handleCancel = (id) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, status: 'Cancelled' } : t));
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Accepted': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      case 'Pending': return 'bg-amber-50 text-amber-600 border border-amber-200';
      case 'Cancelled': return 'bg-red-50 text-red-600 border border-red-200';
      default: return 'bg-slate-50 text-slate-600 border border-slate-200';
    }
  };

  return (
    <>
      <div className="mb-6 p-4">
        <h1 className="font-bold bg-clip-text bg-linear-to-r bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 text-transparent text-3xl pb-1">
          Revenue Details
        </h1>
        <p className="mt-1 text-slate-500">
          Manage transactions and payments here.
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
            <h2 className="font-semibold text-slate-900 text-lg">Transactions</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-slate-200 border-b text-slate-500 text-sm">
                <th className="px-4 pb-3 font-medium">Transaction ID</th>
                <th className="px-4 pb-3 font-medium">Customer</th>
                <th className="px-4 pb-3 font-medium">Amount</th>
                <th className="px-4 pb-3 font-medium">Payment Method</th>
                <th className="px-4 pb-3 font-medium text-center">Status</th>
                <th className="px-4 pb-3 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredTransactions.map((txn, idx) => (
                <tr key={idx} className="group hover:bg-slate-50 border-slate-50 border-b transition-colors">
                  <td className="px-4 py-4 font-mono text-slate-500">{txn.id}</td>
                  <td className="px-4 py-4 font-medium text-slate-900">{txn.user}</td>
                  <td className="px-4 py-4 font-medium text-slate-700">{txn.amount}</td>
                  <td className="px-4 py-4 text-slate-700">{txn.method}</td>
                  <td className="flex justify-center px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${getStatusStyle(txn.status)}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-2">
                      {txn.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => handleAccept(txn.id)}
                            className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                            title="Accept Payment"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleCancel(txn.id)}
                            className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Cancel Payment"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
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
