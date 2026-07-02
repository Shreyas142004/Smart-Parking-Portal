import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { CSVLink } from "react-csv";
import axios from "axios";

export default function AdminRevenue() {
  const { searchQuery } = useOutletContext();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/revenue",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setTotalRevenue(data.totalRevenue);

      const formatted = data.bookings.map((booking) => ({
        id: booking.transactionId,
        user: booking.user?.name,
        location: booking.location?.name || "Unknown Location",
        amount: `₹${booking.amount}`,
        method: booking.paymentMethod,
        status: booking.paymentStatus,
        date: new Date(booking.createdAt).toLocaleDateString(),
      }));
      setTransactions(formatted);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTransactions = transactions.filter(
    (t) =>
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.status.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const downloadCSV = () => {
    const headers = [
      "Transaction ID",
      "Customer",
      "Location",
      "Amount",
      "Payment Method",
      "Date",
      "Status",
    ];

    const rows = filteredTransactions.map((txn) => [
      txn.id,
      txn.user,
      txn.location,
      txn.amount,
      txn.method,
      txn.date,
      txn.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Revenue_Report_${new Date().toLocaleDateString()}.csv`;
    link.click();

    window.URL.revokeObjectURL(url);
  };

  // const csvData = filteredTransactions.map((txn) => ({
  //   "Transaction ID": txn.id,
  //   Customer: txn.user,
  //   Location: txn.location,
  //   Amount: txn.amount,
  //   "Payment Method": txn.method,
  //   Date: txn.date,
  //   Status: txn.status,
  // }));
  // const headers = [
  //   { label: "Transaction ID", key: "Transaction ID" },
  //   { label: "Customer", key: "Customer" },
  //   { label: "Location", key: "Location" },
  //   { label: "Amount", key: "Amount" },
  //   { label: "Payment Method", key: "Payment Method" },
  //   { label: "Date", key: "Date" },
  //   { label: "Status", key: "Status" },
  // ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      case "Cancelled":
        return "bg-red-50 text-red-600 border border-red-200";
      default:
        return "bg-slate-50 text-slate-600 border border-slate-200";
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
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="hover:bg-slate-100 p-2 rounded-lg text-slate-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <h2 className="font-semibold text-slate-900 text-2xl">
              Transactions
            </h2>
          </div>

          {/* Right Side */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2">
              <p className="text-xs text-slate-500">Total Revenue</p>
              <h2 className="font-bold text-xl text-emerald-600">
                ₹{totalRevenue}
              </h2>
            </div>

            <button
              onClick={downloadCSV}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 shadow-md hover:shadow-lg px-5 py-2.5 rounded-xl font-medium text-white transition-all duration-300"
            >
              <Download size={18} />
              Download CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-slate-200 border-b text-slate-500 text-sm">
                <th className="px-4 pb-3 font-medium">Transaction ID</th>
                <th className="px-4 pb-3 font-medium">Customer</th>
                <th className="px-4 pb-3 font-medium">Location</th>
                <th className="px-4 pb-3 font-medium">Amount</th>
                <th className="px-4 pb-3 font-medium">Payment Method</th>
                <th className="px-4 pb-3 font-medium">Date</th>
                <th className="px-4 pb-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredTransactions.map((txn, idx) => (
                <tr
                  key={idx}
                  className="group hover:bg-slate-50 border-slate-50 border-b transition-colors"
                >
                  <td className="px-4 py-4 font-mono text-slate-500">
                    {txn.id}
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {txn.user}
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-700">
                    {txn.location}
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-700">
                    {txn.amount}
                  </td>
                  <td className="px-4 py-4 text-slate-700">{txn.method}</td>
                  <td className="px-4 py-4 text-slate-700">{txn.date}</td>
                  <td className="flex justify-center px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${getStatusStyle(txn.status)}`}
                    >
                      {txn.status}
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
