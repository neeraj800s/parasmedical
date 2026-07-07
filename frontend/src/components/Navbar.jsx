import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeartPulse, Menu, X, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); setDropdownOpen(false); }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home',        path: '/' },
    { name: 'About',       path: '/about' },
    { name: 'Services',    path: '/services' },
    { name: 'Diagnostics', path: '/diagnostics' },
    { name: 'Equipment',   path: '/equipment' },
  ];

  return (
    <nav className={`glass-navbar sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 shadow-2xl shadow-black/40' : 'py-3'} px-4 md:px-8 text-white`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="bg-emerald-500/15 p-2.5 rounded-xl group-hover:bg-emerald-500/25 transition-all duration-300 animate-glow-pulse">
            <HeartPulse className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-wide bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
              Paras
            </span>
            <span className="text-[11px] text-emerald-400/80 font-semibold tracking-[0.2em] uppercase">
              Healthcare
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-4 py-2 text-base font-semibold rounded-xl transition-all duration-200 ${
                isActive(link.path)
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 bg-emerald-400 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2.5 bg-emerald-950/60 border border-emerald-800/40 py-2 px-4 rounded-full hover:border-emerald-600/40 transition-all cursor-pointer"
              >
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-sm font-black uppercase text-slate-950">
                  {user.name.charAt(0)}
                </div>
                <span className="text-base font-semibold text-slate-200">{user.name.split(' ')[0]}</span>
                <span className="text-xs text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                  {user.role}
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-[#071310]/95 border border-emerald-800/40 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-fade-in">
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-base text-slate-200 hover:bg-emerald-800/30 transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4 text-emerald-400" />
                    <span>Dashboard</span>
                  </Link>
                  <div className="my-1 mx-3 h-px bg-emerald-900/50" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-base text-red-300 hover:bg-red-950/30 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-base font-semibold text-slate-300 hover:text-white px-4 py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2.5 rounded-full hover:shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
              >
                Book Care
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-[#040b09]/98 backdrop-blur-xl z-40 px-6 py-10 flex flex-col justify-between border-t border-emerald-900/40 animate-fade-in">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xl font-bold py-3 px-4 rounded-2xl transition-all animate-fade-in-up delay-${(i + 1) * 100} ${
                  isActive(link.path)
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-200 hover:text-emerald-400 hover:bg-emerald-950/40'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col space-y-3 mb-8">
            {user ? (
              <>
                <div className="flex items-center space-x-3 bg-emerald-950/50 p-4 rounded-2xl border border-emerald-800/30">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-black text-xl text-slate-950">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-lg">{user.name}</h4>
                    <p className="text-sm text-emerald-400 uppercase tracking-widest font-semibold">{user.role}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-emerald-800/30 border border-emerald-700/30 text-white font-bold py-3.5 rounded-2xl text-lg transition-all"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-2 bg-red-950/20 border border-red-900/20 text-red-300 font-bold py-3.5 rounded-2xl text-lg transition-all cursor-pointer"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center font-bold text-slate-200 hover:text-white py-3.5 text-lg bg-white/5 rounded-2xl transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3.5 rounded-2xl text-lg hover:shadow-lg transition-all"
                >
                  Book Care
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
