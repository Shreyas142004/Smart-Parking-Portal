import React, { useState } from "react";
import { Mail, Lock, Car, ArrowRight, User, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   navigate('/dashboard/location');
  // };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        },
      );

      console.log(response.data);

      toast.success("Registration successful");

      navigate("/");
    } catch (error) {
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Registration failed");
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
          src="/video3.mp4"
          className="opacity-500 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      </div>
      {/* iOS Liquid Glass Card */}
      <div className="w-full max-w-2xl relative z-10 p-6 md:p-8 bg-white/10 backdrop-blur-3xl backdrop-saturate-150 rounded-4xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/40 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Left Column */}
        <div className="flex-1 flex flex-col items-center text-center md:border-r md:border-slate-300/50 md:pr-8 w-full">
          {/* <div className={clsx('mb-6', 'bg-white', 'rounded-full', 'p-6', 'shadow-lg', 'flex', 'items-center', 'justify-center')}> */}
          <img
            src="/logo.svg"
            alt="ParkZone Logo"
            className="w-16 h-16 object-contain"
          />
          {/* </div> */}
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Create an account
          </h1>
          <p className="text-slate-700 text-sm font-medium">
            Fill in your details to get started.
          </p>
        </div>

        {/* Right Column */}
        <div className="flex-[1.5] w-full">
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800 ml-1">
                Name :
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-slate-900 rounded-2xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-white/80 focus:bg-white/40 focus:border-transparent outline-none transition-all placeholder:text-slate-600 shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800 ml-1">
                Email Address :
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-slate-900 rounded-2xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-white/80 focus:bg-white/40 focus:border-transparent outline-none transition-all placeholder:text-slate-600 shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800 ml-1">
                Password :
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  type={showPassword ? "text" : "password"}
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
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800 ml-1">
                Confirm Password :
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-slate-900 rounded-2xl pl-12 pr-12 py-3.5 focus:ring-2 focus:ring-white/80 focus:bg-white/40 focus:border-transparent outline-none transition-all placeholder:text-slate-600 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 text-white bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 font-medium rounded-xl text-sm px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all shadow-[0_4_14px_0_rgba(6,182,212,0.39)] hover:shadow-[0_6_20px_rgba(6,182,212,0.23)] active:scale-[0.98]"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-slate-700 font-medium">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-bold text-cyan-700 hover:text-cyan-800 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
