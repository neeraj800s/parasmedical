import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-emerald-950/60" style={{ background: '#030808' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 text-left">
        <div className="flex flex-col space-y-5">
          <Link to="/" className="flex items-center space-x-3">
            <HeartPulse className="h-8 w-8 text-emerald-400" />
            <span className="text-2xl font-black text-white tracking-wide">AuraCare</span>
          </Link>
          <p className="text-base text-slate-400 leading-relaxed">
            Bringing hospital-grade clinical care, nursing, and ICU setups directly to your home.
          </p>
          <div className="text-base text-slate-400 space-y-3">
            <a href="tel:+918740840493" className="flex items-center space-x-2.5 hover:text-emerald-400 transition-colors">
              <Phone className="h-4 w-4 text-emerald-400" />
              <span>+91 8740840493</span>
            </a>
            <a href="mailto:parasmedicalstore86@gmail.com" className="flex items-center space-x-2.5 hover:text-emerald-400 transition-colors break-all">
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>parasmedicalstore86@gmail.com</span>
            </a>
            <div className="flex items-start space-x-2.5">
              <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
              <span>Mansarover, Jaipur (Rajasthan)</span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-base font-black text-white uppercase tracking-wider mb-5">Core Services</h5>
          <ul className="text-base space-y-3 text-slate-400">
            {['Home ICU Setup', 'Post-Surgical Nursing', 'Physiotherapy Rehab', 'Elderly Attendant Care', 'Doctor Home Visit'].map(s => (
              <li key={s}><Link to="/services" className="hover:text-emerald-400 transition-colors">{s}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-base font-black text-white uppercase tracking-wider mb-5">Quick Links</h5>
          <ul className="text-base space-y-3 text-slate-400">
            {[['Diagnostics', '/diagnostics'], ['Equipment', '/equipment'], ['About Us', '/about'], ['Login', '/login'], ['Register', '/register']].map(([name, path]) => (
              <li key={name}><Link to={path} className="hover:text-emerald-400 transition-colors">{name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-base font-black text-white uppercase tracking-wider mb-5">Newsletter</h5>
          <p className="text-base text-slate-400 mb-5 leading-relaxed">
            Weekly medical guides from our senior pulmonologists and geriatric specialists.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex bg-black/40 border border-emerald-950/60 p-1.5 rounded-xl">
            <input type="email" required placeholder="Enter your email" className="flex-1 bg-transparent text-base text-white px-3 focus:outline-none placeholder-slate-600 w-full" />
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-4 py-2 rounded-lg text-sm transition-all cursor-pointer">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-emerald-950/40 flex flex-col sm:flex-row items-center justify-between text-base text-slate-500">
        <p>© {new Date().getFullYear()} AuraCare Home Health. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-300 transition-colors">HIPAA Compliance</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
