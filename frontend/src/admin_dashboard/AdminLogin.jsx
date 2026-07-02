import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShieldAlert, Car, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    // e.preventDefault();
    // // Mock login logic
    // if (email === 'admin@parkzone.com' && password === 'admin123') {
    //   toast.success('Admin login successful');
    //   navigate('/admin/dashboard');
    // } else {
    //   toast.error('Invalid admin credentials');
    // }

    e.preventDefault();
      try {
        const {data} =await axios.post("http://localhost:5000/api/auth/login",{
          email,
          password
        })

        // Verify admin role

        if(data.user.role !== "admin"){
          toast.error("Access Denied. Admin only.");
          return
        }

        localStorage.setItem("token",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));
        toast.success("Admin login successful");
        navigate("/admin/dashboard");
        
      } catch (error) {
        console.error(error);

        toast.error(error.response?.data?.message || "Invaild credentials");
        
      }
    };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-r from-[#e0e8ff] to-[#cff3fa] flex flex-col justify-center items-center p-4">
      {/* Background Video */}
      <div className="z-0 absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/video4.mp4"
          className="opacity-500 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      </div>
      {/* iOS Liquid Glass Card */}
      <div className="w-full max-w-md relative z-10 p-8 bg-white/10 backdrop-blur-2xl backdrop-saturate-150 rounded-4xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/40">
        
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-full mb-4 border border-white/30 shadow-sm">
            <ShieldAlert className="w-8 h-8 text-slate-800" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-wide flex items-center gap-2">
            <img src="/logo.svg" alt="ParkZone Logo" className="w-7 h-7 object-contain" />
            ParkZone Admin
          </h1>
          <p className="text-slate-700 mt-2 text-sm font-medium">Secure access to the control panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800 ml-1">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="•••••@•••••.com"
                className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-slate-900 rounded-2xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-white/80 focus:bg-white/40 focus:border-transparent outline-none transition-all placeholder:text-slate-600 shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-slate-900 rounded-2xl pl-12 pr-12 py-3.5 focus:ring-2 focus:ring-white/80 focus:bg-white/40 focus:border-transparent outline-none transition-all placeholder:text-slate-600 shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 text-white bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 font-medium rounded-xl text-sm px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all shadow-[0_4_14px_0_rgba(6,182,212,0.39)] hover:shadow-[0_6_20px_rgba(6,182,212,0.23)] active:scale-[0.98]"
                
            >
              Access Dashboard
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}