import React from 'react';
import { Phone, Mail } from 'lucide-react';

const FloatingContact = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col md:flex-row items-center gap-3.5 bg-[#0f172a]/95 backdrop-blur-xl border border-slate-700/60 p-3 rounded-full shadow-[0_12px_40px_rgba(15,23,42,0.6)] transition-all duration-300 animate-pulse-slow">
      {/* Phone Action - Vibrant Orange/Gold Accent */}
      <a
        href="tel:+918740840493"
        className="flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-lg transition-all duration-300 hover:scale-115 active:scale-95 group relative"
        aria-label="Call +918740840493"
      >
        <Phone className="h-5 w-5" />
        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3.5 md:right-1/2 md:translate-x-1/2 md:bottom-full md:top-auto md:-translate-y-0 md:mr-0 md:mb-3 bg-[#0f172a] border border-amber-500/40 text-amber-400 text-[11px] font-black py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-2xl">
          Call: +91 8740840493
        </span>
      </a>

      {/* Separator line - hidden on mobile, visible on desktop */}
      <div className="hidden md:block h-6 w-[1px] bg-slate-700/60" />

      {/* Mail Action - Vibrant Royal Indigo Accent */}
      <a
        href="mailto:parasmedicalstore86@gmail.com"
        className="flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white shadow-lg transition-all duration-300 hover:scale-115 active:scale-95 group relative"
        aria-label="Email parasmedicalstore86@gmail.com"
      >
        <Mail className="h-5 w-5" />
        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3.5 md:right-1/2 md:translate-x-1/2 md:bottom-full md:top-auto md:-translate-y-0 md:mr-0 md:mb-3 bg-[#0f172a] border border-indigo-500/40 text-indigo-400 text-[11px] font-black py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-2xl">
          Mail: parasmedicalstore86@gmail.com
        </span>
      </a>
    </div>
  );
};

export default FloatingContact;
