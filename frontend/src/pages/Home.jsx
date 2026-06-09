import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Clock, UserCheck, Heart, HeartPulse,
  Search, ChevronRight, Sparkles, ArrowUpRight,
  Activity, Stethoscope, Layers, Truck
} from 'lucide-react';

/* ── Animated Counter Hook ──────────────────────────────── */
const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768 ? target : 0;
  });
  const ref = useRef(null);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.05 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return { count, ref };
};

/* ── Scroll Reveal Hook ──────────────────────────────────── */
const useScrollReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  });
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.02 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
};

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { count: patients, ref: r1 } = useCounter(10000);
  const { count: nurses,   ref: r2 } = useCounter(2500);
  const trustReveal  = useScrollReveal();
  const heroReveal   = useScrollReveal();

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: 'Critical Care Excellence',
      title: 'Critical Home ICU Setups',
      desc: 'We bring complete hospital-grade intensive care units to your home. Fully equipped with advanced ventilators, multi-channel patient monitors, oxygen support, and 24/7 critical care nurses for round-the-clock safety.',
      btnText: 'Explore Critical Care',
      btnLink: '/services',
      image: '/slide_icu.png',
      themeColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
      glowBg: 'bg-emerald-500/10',
      btnClass: 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 hover:shadow-emerald-500/20',
      bgGradient: 'linear-gradient(135deg, #030808 0%, #061410 40%, #091e1a 100%)',
      imageBorder: 'border-emerald-500/25 shadow-[0_0_50px_rgba(16,185,129,0.35)]',
      indicatorColor: 'bg-emerald-400',
    },
    {
      badge: 'Verified Nursing Staff',
      title: 'Compassionate Home Nursing',
      desc: 'Get highly trained, certified male and female nurses for post-operative recovery, tracheostomy care, injection administration, dressing, and complex clinical monitoring. Expert recovery at home.',
      btnText: 'Hire a Nurse',
      btnLink: '/services',
      image: '/slide_nurse.png',
      themeColor: 'text-teal-400',
      badgeBg: 'bg-teal-500/10 border-teal-500/20 text-teal-300',
      glowBg: 'bg-teal-500/8',
      btnClass: 'bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 hover:shadow-teal-500/20',
      bgGradient: 'linear-gradient(135deg, #020706 0%, #051412 40%, #08211d 100%)',
      imageBorder: 'border-teal-500/25 shadow-[0_0_50px_rgba(20,184,166,0.35)]',
      indicatorColor: 'bg-teal-400',
    },
    {
      badge: 'Restorative Care',
      title: 'Professional Home Physiotherapy',
      desc: 'Accelerate recovery from stroke, joint replacements, and sports injuries with personalized rehabilitation plans and advanced modalities, guided by certified physical therapists.',
      btnText: 'Book Physiotherapist',
      btnLink: '/services',
      image: '/slide_physio.png',
      themeColor: 'text-rose-400',
      badgeBg: 'bg-rose-500/10 border-rose-500/20 text-rose-300',
      glowBg: 'bg-rose-500/8',
      btnClass: 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-rose-500/20',
      bgGradient: 'linear-gradient(135deg, #080304 0%, #150609 40%, #20090f 100%)',
      imageBorder: 'border-rose-500/25 shadow-[0_0_50px_rgba(244,63,94,0.35)]',
      indicatorColor: 'bg-rose-400',
    },
    {
      badge: 'Diagnostics at Doorstep',
      title: 'NABL Home Lab Diagnostics',
      desc: 'Book full body health packages, sugar profiles, CBC, liver/kidney function tests online. Professional phlebotomists collect samples at home with 100% sterile safety.',
      btnText: 'Schedule Lab Test',
      btnLink: '/diagnostics',
      image: '/slide_diagnostic.png',
      themeColor: 'text-sky-400',
      badgeBg: 'bg-sky-500/10 border-sky-500/20 text-sky-300',
      glowBg: 'bg-sky-500/8',
      btnClass: 'bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 hover:shadow-sky-500/20',
      bgGradient: 'linear-gradient(135deg, #030508 0%, #060e15 40%, #091621 100%)',
      imageBorder: 'border-sky-500/25 shadow-[0_0_50px_rgba(56,189,248,0.35)]',
      indicatorColor: 'bg-sky-400',
    },
    {
      badge: 'Clinical Grade Leases',
      title: 'Certified Medical Equipment',
      desc: 'Rent or buy top-quality respiratory and ICU devices, including 5L/10L oxygen concentrators, BiPAP/CPAP machines, medical beds, anti-decubitus air mattresses, and patient monitors.',
      btnText: 'Rent or Buy Equipment',
      btnLink: '/equipment',
      image: '/slide_equipment.png',
      themeColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
      glowBg: 'bg-amber-500/8',
      btnClass: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:shadow-amber-500/20',
      bgGradient: 'linear-gradient(135deg, #080603 0%, #151006 40%, #211909 100%)',
      imageBorder: 'border-amber-500/25 shadow-[0_0_50px_rgba(245,158,11,0.35)]',
      indicatorColor: 'bg-amber-400',
    },
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate('/services');
  };

  const highlights = [
    { icon: <ShieldCheck className="h-7 w-7" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10',  title: 'Safe & Certified',     desc: 'NABH compliant clinical teams with hospital-grade protocols.' },
    { icon: <Clock        className="h-7 w-7" />, color: 'text-teal-400',   bg: 'bg-teal-500/10',    title: '24/7 Monitoring',       desc: 'Continuous vital telemetry and real-time emergency response.' },
    { icon: <UserCheck    className="h-7 w-7" />, color: 'text-amber-400',  bg: 'bg-amber-500/10',   title: 'Verified Caregivers',   desc: 'Police-checked, BLS certified with minimum 2 yr experience.' },
    { icon: <Heart        className="h-7 w-7" />, color: 'text-rose-400',   bg: 'bg-rose-500/10',    title: 'Empathy First',         desc: 'Every attendant is evaluated for compassion and patience.' },
  ];

  return (
    <div className="page-enter bg-dark-section">

      {/* ══ HERO SLIDESHOW ══════════════════════════════════════ */}
      <header className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 md:px-8 overflow-hidden">
        {/* Smooth background cross-fade layers */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out z-0"
            style={{
              background: slide.bgGradient,
              opacity: currentSlide === idx ? 1 : 0
            }}
          />
        ))}

        {/* Grid BG */}
        <div className="absolute inset-0 hero-grid opacity-40 z-0 pointer-events-none" />

        {/* Static Background Image with mix-blend for textures */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay filter blur-[2px] z-0 pointer-events-none"
          style={{ backgroundImage: `url('/hero_homecare_bg.png')` }}
        />

        {/* Ambient shifting color orb */}
        <div className={`absolute top-1/4 left-1/4 h-80 w-80 rounded-full blur-[100px] animate-float pointer-events-none transition-all duration-1000 z-0 ${
          currentSlide === 0 ? 'bg-emerald-500/10' :
          currentSlide === 1 ? 'bg-teal-500/10' :
          currentSlide === 2 ? 'bg-rose-500/10' :
          currentSlide === 3 ? 'bg-sky-500/10' : 'bg-amber-500/10'
        }`} />
        
        <div className={`absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full blur-[120px] animate-float-slow pointer-events-none transition-all duration-1000 z-0 ${
          currentSlide === 0 ? 'bg-teal-500/8' :
          currentSlide === 1 ? 'bg-emerald-500/8' :
          currentSlide === 2 ? 'bg-pink-500/8' :
          currentSlide === 3 ? 'bg-indigo-500/8' : 'bg-orange-500/8'
        }`} style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
          
          {/* Left Column: Slideshow Content with absolute swap container to avoid layout shifts */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left relative w-full h-[480px] xs:h-[380px] sm:h-[320px] md:h-[340px] lg:h-[440px]">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 flex flex-col justify-center space-y-6 md:space-y-7 transition-all duration-1000 ease-in-out ${
                  currentSlide === idx
                    ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
                    : 'opacity-0 translate-y-6 pointer-events-none scale-[0.98]'
                }`}
              >
                {/* Slide Badge */}
                <div className={`inline-flex items-center space-x-2.5 border px-4 py-2 rounded-full w-fit ${slide.badgeBg}`}>
                  <Sparkles className="h-4 w-4 animate-spin-slow" />
                  <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                    {slide.badge}
                  </span>
                </div>

                {/* Slide Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                  <span className={`${slide.themeColor} drop-shadow-[0_0_35px_rgba(255,255,255,0.08)]`}>
                    {slide.title}
                  </span>
                </h1>

                {/* Slide Description */}
                <p className="text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
                  {slide.desc}
                </p>

                {/* Slide Button */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to={slide.btnLink}
                    className={`font-black px-6 py-3.5 rounded-full flex items-center space-x-2.5 text-base md:text-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-xl ${slide.btnClass}`}
                  >
                    <span>{slide.btnText}</span>
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                  <Link to="/about" className="btn-ghost text-base md:text-lg">
                    Learn About Us
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Breathing Circular Image with smooth swap */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-64 w-64 sm:h-80 sm:w-80 md:h-[420px] md:w-[420px] mx-auto">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 rounded-full overflow-hidden border-4 ${slide.imageBorder} p-1 bg-white/5 backdrop-blur-md transition-all duration-1000 ease-in-out ${
                  currentSlide === idx
                    ? 'opacity-100 scale-100 pointer-events-auto rotate-0'
                    : 'opacity-0 scale-90 pointer-events-none rotate-6'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover rounded-full animate-breathing-zoom"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-6 md:left-12 flex items-center space-x-3 z-20">
          {slides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? `w-8 ${slide.indicatorColor}` : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 right-6 md:right-12 flex items-center space-x-2 animate-bounce-gentle hidden md:flex z-20">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Scroll to Explore</span>
          <div className="h-7 w-4.5 border border-slate-600 rounded-full flex items-start justify-center p-1">
            <div className="h-1.5 w-1 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>

      </header>

      {/* ══ SEARCH & STATISTICS CENTER ════════════════════ */}
      <section className="py-12 px-4 border-b border-emerald-950/60" style={{ background: '#040b09' }}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Search bar */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-3 text-left">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Find Services Immediately</span>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch bg-black/40 backdrop-blur-xl p-2 rounded-2xl border border-emerald-900/40 w-full gap-2 shadow-2xl">
              <div className="flex-1 flex items-center px-4 space-x-3">
                <Search className="h-5 w-5 text-emerald-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for ICU at Home, Physiotherapy, Nursing..."
                  className="w-full bg-transparent text-white placeholder-slate-500 text-base py-3 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="btn-primary flex items-center justify-center space-x-2 px-6 text-base cursor-pointer"
              >
                <span>Find Service</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Stats counts */}
          <div className="w-full lg:w-1/2 grid grid-cols-3 gap-6 text-left border-l-0 lg:border-l border-emerald-950/60 lg:pl-10">
            <div>
              <h4 className="text-3xl md:text-4xl font-black text-emerald-400">{patients.toLocaleString()}+</h4>
              <p className="text-xs md:text-sm text-slate-400 uppercase tracking-widest font-semibold mt-1">Patients Served</p>
            </div>
            <div>
              <h4 className="text-3xl md:text-4xl font-black text-teal-400">{nurses.toLocaleString()}+</h4>
              <p className="text-xs md:text-sm text-slate-400 uppercase tracking-widest font-semibold mt-1">Verified Caregivers</p>
            </div>
            <div>
              <h4 className="text-3xl md:text-4xl font-black text-amber-400">4.9 <span className="text-xl">/ 5</span></h4>
              <p className="text-xs md:text-sm text-slate-400 uppercase tracking-widest font-semibold mt-1">Patient Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRUST PILLARS ═════════════════════════════════ */}
      <section ref={trustReveal.ref} className="py-16 px-4 border-t border-b border-emerald-950/60" style={{ background: 'rgba(6,13,12,0.95)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((h, i) => (
            <div
              key={i}
              className={`flex items-start space-x-4 p-6 rounded-2xl bg-white/2 border border-emerald-950/60 hover:border-emerald-700/30 transition-all duration-300 ${trustReveal.visible ? `animate-fade-in-up delay-${(i + 1) * 100}` : 'opacity-0'}`}
            >
              <div className={`p-3 ${h.bg} rounded-xl shrink-0 ${h.color}`}>
                {h.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{h.title}</h4>
                <p className="text-base text-slate-400 mt-1.5 leading-relaxed">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ QUICK LINKS ═══════════════════════════════════ */}
      <section className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #060d0c 0%, #081512 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/8 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Explore Our Platform</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Everything You Need <br />
              <span className="text-gradient">Under One Roof</span>
            </h2>
            <p className="text-xl text-slate-400 mt-5 max-w-2xl mx-auto leading-relaxed">
              From critical ICU setups to daily nursing care — AuraCare delivers it all at your doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Activity className="h-10 w-10" />, title: 'Our Services', desc: 'ICU, Nursing, Physiotherapy, Doctor Visits & more.', link: '/services', color: 'from-emerald-500/15 to-teal-500/5', border: 'border-emerald-500/20 hover:border-emerald-400/40', iconBg: 'bg-emerald-500/10 text-emerald-400' },
              { icon: <Layers    className="h-10 w-10" />, title: 'Diagnostics',  desc: 'NABL-certified home lab tests & mobile diagnostics.', link: '/diagnostics', color: 'from-sky-500/15 to-blue-500/5',    border: 'border-sky-500/20 hover:border-sky-400/40',    iconBg: 'bg-sky-500/10 text-sky-400' },
              { icon: <Truck     className="h-10 w-10" />, title: 'Equipment',    desc: 'Rent or buy premium medical & respiratory devices.', link: '/equipment',   color: 'from-teal-500/15 to-emerald-500/5', border: 'border-teal-500/20 hover:border-teal-400/40',   iconBg: 'bg-teal-500/10 text-teal-400' },
              { icon: <Stethoscope className="h-10 w-10" />, title: 'About Us',  desc: 'Our mission, team, and clinical promise to you.', link: '/about',       color: 'from-amber-500/15 to-orange-500/5', border: 'border-amber-500/20 hover:border-amber-400/40', iconBg: 'bg-amber-500/10 text-amber-400' },
            ].map((card, i) => (
              <Link
                key={i}
                to={card.link}
                className={`group relative p-8 rounded-3xl bg-gradient-to-br ${card.color} border ${card.border} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40 flex flex-col`}
              >
                <div className={`p-4 rounded-2xl ${card.iconBg} w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-3">{card.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed flex-1">{card.desc}</p>
                <div className="mt-6 flex items-center space-x-2 text-emerald-400 font-bold text-base group-hover:space-x-3 transition-all">
                  <span>Explore</span>
                  <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════ */}
      <section className="py-24 px-4 border-t border-emerald-950/40" style={{ background: 'linear-gradient(135deg, #030808 0%, #071210 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-rose-500/8 border border-rose-500/20 px-4 py-2 rounded-full mb-6">
              <Heart className="h-4 w-4 text-rose-400" />
              <span className="text-sm font-bold text-rose-400 uppercase tracking-widest">Patient Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Stories of <span className="text-gradient">Hope & Recovery</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Setting up an ICU for my father was incredibly stressful. AuraCare delivered a motorized cardiac bed, ventilator, and multi-para monitor within 4 hours. The clinical nurses were exceptional.", author: "Anjali Mehta", relation: "Daughter of Patient", location: "Mansarover, Jaipur" },
              { text: "The post-stroke neuro-rehabilitation visits by their physiotherapist made all the difference. In 3 months, my husband regained 80% grip strength and is walking independently.", author: "Rakesh Sharma", relation: "Spouse", location: "Jaipur, Rajasthan" },
              { text: "As a senior living alone, having a trained nurse attendant visit weekly gives me immense peace of mind. Their empathy and professionalism are unmatched.", author: "Kalyani Nair", relation: "Self Patient", location: "Jaipur" },
            ].map((rev, i) => (
              <div
                key={i}
                className="glass-card p-8 rounded-3xl flex flex-col justify-between"
              >
                <div className="text-amber-400 text-xl tracking-widest mb-5">★★★★★</div>
                <p className="text-lg text-slate-300 leading-relaxed italic flex-1">
                  "{rev.text}"
                </p>
                <div className="pt-6 border-t border-emerald-900/40 mt-6 flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-black text-xl text-slate-950">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-base">{rev.author}</h5>
                    <p className="text-sm text-slate-400 font-medium">{rev.relation} • {rev.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INSTANT CALLBACK CONSULTATION ══════════════════ */}
      <section className="py-24 px-4 border-t border-emerald-950/40" style={{ background: '#050c0b' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/8 border border-emerald-500/20 px-4 py-2 rounded-full">
              <Clock className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Rapid Callback Service</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Request a Free <br />
              <span className="text-gradient">Clinical Consultation</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Don't navigate complex healthcare decisions alone. Speak with our senior medical officer or operations director to draft a fully customized home care program tailored to your patient's exact medical, scheduling, and diagnostic requirements.
            </p>
            <div className="space-y-4 pt-4">
              {[
                'Response within 15 minutes guaranteed.',
                'Customized caregiver matching based on patient profile.',
                'Detailed pricing proposals with no hidden overheads.',
                'Telehealth consultation with qualified clinicians.'
              ].map((p, i) => (
                <div key={i} className="flex items-center space-x-3 text-base text-slate-300">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-6">
            <div className="glass-card-dark rounded-3xl p-8 md:p-10 relative overflow-hidden gradient-border text-left shadow-2xl">
              <div className="absolute -top-8 -right-8 h-32 w-32 bg-emerald-500/8 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                  <HeartPulse className="h-7 w-7 text-emerald-400 animate-bounce-gentle" />
                  <h3 className="text-2xl font-bold text-white">Instant Consultation</h3>
                </div>
                <p className="text-base text-slate-400 mb-7">Get an expert callback within 15 minutes</p>

                <div className="flex flex-col space-y-5">
                  <div>
                    <label className="text-xs font-bold text-emerald-400 uppercase tracking-[0.18em] block mb-2">Select Patient Need</label>
                    <select className="w-full bg-black/40 border border-emerald-800/40 text-slate-200 text-base px-4 py-3.5 rounded-xl focus:border-emerald-500 focus:outline-none transition-all">
                      <option>ICU Setup at Home</option>
                      <option>Home Nurse (Male/Female)</option>
                      <option>Physiotherapist Visit</option>
                      <option>Doctor Consultation</option>
                      <option>Trained Attendant</option>
                      <option>Home Diagnostics</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-emerald-400 uppercase tracking-[0.18em] block mb-2">Name</label>
                      <input type="text" placeholder="Your Name" className="w-full bg-black/40 border border-emerald-800/40 text-slate-200 text-base px-4 py-3.5 rounded-xl focus:border-emerald-500 focus:outline-none transition-all placeholder-slate-600" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-emerald-400 uppercase tracking-[0.18em] block mb-2">Phone</label>
                      <input type="tel" placeholder="Mobile Number" className="w-full bg-black/40 border border-emerald-800/40 text-slate-200 text-base px-4 py-3.5 rounded-xl focus:border-emerald-500 focus:outline-none transition-all placeholder-slate-600" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 text-sm text-slate-400 bg-emerald-950/30 p-3 rounded-xl border border-emerald-900/20">
                    <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span>HIPAA compliant. Your data is 100% secure and private.</span>
                  </div>

                  <button
                    onClick={() => navigate('/login')}
                    className="btn-primary w-full flex items-center justify-center space-x-2.5 text-lg cursor-pointer"
                  >
                    <span>Book Free Clinical Call</span>
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #071410 0%, #0d2821 50%, #071410 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <HeartPulse className="h-16 w-16 text-emerald-400 mx-auto mb-6 animate-pulse-subtle" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight">
            Ready to Experience <span className="text-gradient">Clinical Care at Home?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            Join 10,000+ families who chose comfort without compromising on quality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/register" className="btn-primary flex items-center space-x-2 text-lg">
              <span>Start Your Care Journey</span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
            <Link to="/about" className="btn-ghost text-lg">
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
