import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeartPulse, Mail, Lock, ShieldAlert, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login, error, setError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [loading, setLoading]       = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const validateForm = () => {
    if (!email || !password) { setValidationError('Please fill in all fields'); return false; }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) { setValidationError('Please enter a valid email address'); return false; }
    setValidationError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError(null);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setValidationError(result.message || result.error || 'Invalid email or password');
    }
  };

  const inputClass = "w-full bg-black/40 border border-emerald-900/40 text-white text-base pl-12 pr-4 py-4 rounded-2xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder-slate-600";

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-16 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #030808 0%, #071410 60%, #060d0c 100%)' }}>
      <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-emerald-500/6 blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-teal-500/5 blur-[100px] animate-float-slow pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 animate-fade-in-up">

        {/* Logo */}
        <div className="text-center mb-10 flex flex-col items-center">
          <Link to="/" className="flex items-center space-x-3 mb-3">
            <div className="bg-emerald-500/15 p-3 rounded-xl animate-glow-pulse">
              <HeartPulse className="h-9 w-9 text-emerald-400" />
            </div>
            <span className="text-3xl font-black text-white tracking-wide">AuraCare</span>
          </Link>
          <p className="text-sm text-slate-500 font-semibold tracking-[0.2em] uppercase">Secure Patient & Admin Portal</p>
        </div>

        {/* Card */}
        <div className="glass-card-dark rounded-3xl p-8 md:p-10 gradient-border">
          <h2 className="text-3xl font-black text-white mb-2">Welcome Back</h2>
          <p className="text-base text-slate-400 mb-8">Enter your credentials to access your secure dashboard.</p>

          {(validationError || error) && (
            <div className="mb-6 p-4 bg-rose-950/50 border border-rose-800/40 rounded-2xl flex items-start space-x-3 text-rose-300 text-base">
              <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
              <span>{validationError || error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div>
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-[0.18em] block mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-5 w-5" />
                </div>
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setValidationError(''); }} placeholder="name@example.com" className={inputClass} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-emerald-400 uppercase tracking-[0.18em]">Password</label>
                <a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors font-semibold">Forgot?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-5 w-5" />
                </div>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); setValidationError(''); }} placeholder="••••••••" className={`${inputClass} pr-12`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2 flex items-center justify-center space-x-2.5 text-lg disabled:opacity-50 animate-glow-pulse">
              <span>{loading ? 'Verifying...' : 'Sign In Securely'}</span>
              {!loading && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>

          <p className="text-base text-slate-500 mt-7 text-center">
            New to AuraCare?{' '}
            <Link to="/register" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors cursor-pointer">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
