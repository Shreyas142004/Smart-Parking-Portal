import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Car, ChevronDown, User, LogOut, Menu } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <div className="selection:bg-cyan-500/30 bg-linear-to-r from-[#e0e8ff] to-[#cff3fa] min-h-screen font-sans text-[#212529]">
      {/* Top Navbar */}
      <nav className="top-0 z-50 sticky bg-white/80 shadow-sm backdrop-blur-xl border-slate-200 border-b">
        <div className="flex flex-wrap justify-between items-center mx-auto px-4 md:px-8 py-2 md:py-0 w-full md:h-14">
          <div className="flex items-center gap-2 mr-4 py-1 font-medium text-slate-900 text-xl">
            <img src="/logo.svg" alt="ParkZone Logo" className="w-10 h-10 object-contain" />
            ParkZone Admin
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden px-2 py-1 border border-slate-200 rounded text-slate-500 hover:bg-slate-50"
            type="button"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className={`md:flex md:flex-1 md:items-center w-full md:w-auto ${isMobileMenuOpen ? "block mt-4 md:mt-0" : "hidden"}`}>
            <div className="flex md:flex-row flex-col md:items-center md:space-x-4 space-y-4 md:space-y-0 pb-4 md:pb-0 ml-auto">
              <form className="flex" role="search" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="bg-white mr-2 px-3 py-1.5 border border-slate-300 focus:border-[#86b7fe] rounded outline-none focus:ring-[#0d6efd40] focus:ring-4 w-full md:w-auto text-[#212529] transition-all"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  aria-label="Search"
                />
                {/* <button className={clsx('hover:bg-[#198754]', 'px-3', 'py-1.5', 'border', 'border-[#198754]', 'rounded', 'focus:ring-[#19875480]', 'focus:ring-4', 'font-medium', 'text-[#198754]', 'hover:text-white', 'whitespace-nowrap', 'transition-colors')} type="submit">
                  Search
                </button> */}
              </form>

              {/* Profile & Notifications */}
              <div className="flex items-center space-x-4 pt-2 md:pt-0 md:pl-4 md:border-slate-200 md:border-l">
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                  >
                    <img
                      src="/admin2.svg"
                      alt="Admin"
                      className="bg-white rounded-full w-8 h-8 object-cover"
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="right-0 z-50 absolute bg-white shadow-lg mt-2 py-2 border border-slate-100 rounded-xl w-48 text-slate-800 text-left">
                      <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3 hover:bg-slate-50 px-4 py-2.5 w-full hover:text-cyan-600 text-sm"
                      >
                        <User className="w-4 h-4" /> User Login
                      </button>
                      <button
                        onClick={() => navigate('/admin')}
                        className="flex items-center gap-3 hover:bg-rose-50 px-4 py-2.5 w-full text-rose-600 text-sm"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content Rendered Here */}
      <main className="mx-auto px-4 md:px-8 pb-12 container">
        <div className="space-y-8 mx-auto max-w-7xl">
          <Outlet context={{ searchQuery }} />
        </div>
      </main>
    </div>
  );
}
