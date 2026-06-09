import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Truck, CheckCircle, Sparkles, ArrowUpRight, RotateCcw, ShoppingCart } from 'lucide-react';

const useScrollReveal = (threshold = 0.02) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  });
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
};

const equipments = [
  { name: 'Oxygen Concentrator 5L',      tag: 'Respiratory Support', tagColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',       icon: '💨', features: ['Continuous O₂ delivery', 'Alarm system', 'Low-noise operation', 'Easy-carry handle'] },
  { name: 'Oxygen Concentrator 10L',     tag: 'Respiratory Support', tagColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',       icon: '💨', features: ['High flow 10L output', 'Dual flow option', 'Oxygen purity sensor', 'Heavy-duty performance'] },
  { name: 'Oxygen Cylinder',             tag: 'Respiratory Support', tagColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',       icon: '🔋', features: ['Sturdy steel cylinder', 'High-pressure regulator', 'Flowmeter included', 'Emergency backup source'] },
  { name: 'BiPAP Machine',               tag: 'Sleep & Breathing',   tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',icon: '🔌', features: ['Auto pressure adj.', 'Heated humidifier', 'Detailed sleep reports', 'Silent blower motor'] },
  { name: 'CPAP Machine',                tag: 'Sleep & Breathing',   tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',icon: '🔌', features: ['Continuous positive airway', 'EPR pressure relief', 'Leak compensation', 'Compact travel design'] },
  { name: 'Portable Ventilator',         tag: 'Critical Ventilation', tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',   icon: '⚙️', features: ['Invasive & Non-invasive', 'Multi-mode ventilation', 'Internal battery backup', 'Comprehensive alarms'] },
  { name: 'Suction Machine',             tag: 'Airway Clearance',    tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: '🫁', features: ['High vacuum capacity', 'Oil-free lubrication', 'Overflow protection', 'Noise level < 60dB'] },
  { name: 'ICU Motorized Patient Bed',   tag: 'Luxury Care Beds',    tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',    icon: '🛏️', features: ['Electric height adj.', 'Side safety rails', 'Trendelenburg position', 'Anti-decubitus surface'] },
  { name: 'Manual Medical Bed',          tag: 'Patient Comfort',     tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',    icon: '🛏️', features: ['Backrest/Kneerest cranks', 'Collapsible side rails', 'Lockable castor wheels', 'I.V. pole attachments'] },
  { name: 'Air Mattress (Anti-Decubitus)',tag: 'Sore Prevention',    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',icon: '🎈', features: ['Alternating air pressure', 'Bubble pad design', 'Adjustable pressure knob', 'Low noise pump'] },
  { name: 'Foldable Wheelchair',         tag: 'Mobility Aid',        tagColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',icon: '♿', features: ['Chrome-plated frame', 'Foldable design', 'Dual brakes system', 'Padded armrests'] },
  { name: 'Motorized Wheelchair',        tag: 'Mobility Aid',        tagColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',icon: '♿', features: ['Joystick controller', 'Powerful dual motors', 'Foldable lightweight frame', 'Flip-up armrests'] },
  { name: 'Reclining Wheelchair',        tag: 'Mobility Aid',        tagColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',icon: '♿', features: ['Full recline backrest', 'Elevating legrests', 'Headrest extension', 'Heavy-duty frame'] },
  { name: 'Adjustable Walker',           tag: 'Mobility Aid',        tagColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',icon: '🚶', features: ['Lightweight aluminum', 'Reciprocal folding', 'Height adjustable legs', 'Non-slip hand grips'] },
  { name: 'Commode Chair',               tag: 'Toilet Support',      tagColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',icon: '🪑', features: ['Foldable frame', 'Adjustable height', 'Removable commode bucket', 'Non-slip rubber tips'] },
  { name: 'Patient Monitor (Multi-Para)',tag: 'Vital Tracking',      tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',    icon: '📟', features: ['ECG + SpO₂ + BP + Temp', 'Color TFT display', 'Audible alarms', 'Trend memory data'] },
  { name: 'Pulse Oximeter (Tabletop)',   tag: 'SpO₂ Monitoring',     tagColor: 'text-pink-400 bg-pink-500/10 border-pink-500/20',    icon: '🩺', features: ['Continuous SpO₂ tracking', 'Pulse rate waveform', 'Visual & audio alarms', 'Built-in battery'] },
  { name: 'Syringe Pump',                tag: 'Medication Delivery', tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',icon: '💉', features: ['Microflow rate precision', 'Universal syringe match', 'Occlusion warning', 'Battery backup (4h)'] },
  { name: 'Infusion Pump',               tag: 'Medication Delivery', tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',icon: '💉', features: ['Volumetric fluid delivery', 'Air-in-line detector', 'Drip rate sensor', 'Anti-free flow clamp'] },
  { name: 'Enteral Feeding Pump',        tag: 'Clinical Nutrition',  tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',icon: '🍼', features: ['Enteral fluid delivery', 'Accurate nutrition dosing', 'Occlusion sensor', 'Compact pole mount'] },
  { name: 'DVT Pump',                    tag: 'Vascular Therapy',    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',icon: '🦶', features: ['Sequential compression', 'Atheromedic pressure', 'Reusable leg sleeves', 'Improves blood flow'] },
  { name: 'Nebulizer Machine',           tag: 'Respiratory Support', tagColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',       icon: '🌬️', features: ['Efficient aerosol therapy', 'One-button operation', 'Adult & pediatric masks', 'Low residual volume'] },
  { name: 'Hydraulic Patient Lifter',    tag: 'Transfer Support',    tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',    icon: '🏗️', features: ['Heavy-duty steel crane', '4-point sling attachment', 'Safe load up to 150kg', 'Lockable base legs'] },
];

const perks = [
  { icon: <CheckCircle className="h-7 w-7 text-emerald-400" />, title: 'Sanitized Before Delivery',   desc: 'Every device is clinically disinfected and calibrated by our technical team before it reaches you.' },
  { icon: <RotateCcw   className="h-7 w-7 text-teal-400"    />, title: 'Free Pickup & Return',        desc: 'Hassle-free pickup when your rental period ends, with zero hidden logistic charges.' },
  { icon: <Truck       className="h-7 w-7 text-sky-400"     />, title: 'Same-Day Delivery',           desc: 'Critical equipment delivered within 4–6 hours of confirmed order in major cities.' },
  { icon: <Sparkles    className="h-7 w-7 text-amber-400"   />, title: 'Technical Support Included',  desc: '24/7 on-call biomedical support to assist with device operation and troubleshooting.' },
];

const EquipmentPage = () => {
  const { user } = useAuth();
  const heroReveal  = useScrollReveal();
  const gridReveal  = useScrollReveal();
  const perksReveal = useScrollReveal();

  return (
    <div className="page-enter" style={{ background: '#060d0c' }}>

      {/* ══ PAGE HERO ══════════════════════════════════════ */}
      <section className="relative py-28 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #030808 0%, #071412 60%, #060d0c 100%)' }}>
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="absolute top-1/3 left-1/3 h-72 w-72 rounded-full bg-teal-500/6 blur-[100px] animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-emerald-500/5 blur-[120px] animate-float-slow pointer-events-none" style={{ animationDelay: '3s' }} />

        <div ref={heroReveal.ref} className="relative max-w-4xl mx-auto text-center z-10">
          <div className={`inline-flex items-center space-x-2 bg-teal-500/8 border border-teal-500/20 px-4 py-2 rounded-full mb-6 ${heroReveal.visible ? 'animate-fade-in-down' : 'opacity-0'}`}>
            <Truck className="h-5 w-5 text-teal-400" />
            <span className="text-sm font-bold text-teal-400 uppercase tracking-widest">Clinical Equipment Solutions</span>
          </div>
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6 ${heroReveal.visible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
            Rent or Purchase <span className="text-gradient">Premium Medical Setup</span>
          </h1>
          <p className={`text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-10 ${heroReveal.visible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
            Hospital-grade respiratory, cardiac, and mobility systems — serviced, calibrated, and delivered by clinical technicians before every use.
          </p>
          <div className={`flex flex-wrap justify-center gap-4 ${heroReveal.visible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
            {['Sanitized Before Delivery', 'Same-Day Available', '24/7 Tech Support', 'Free Pickup & Return'].map(badge => (
              <div key={badge} className="flex items-center space-x-2 bg-teal-500/8 border border-teal-500/20 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-teal-400" />
                <span className="text-base font-semibold text-teal-300">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ EQUIPMENT GRID ═════════════════════════════════ */}
      <section ref={gridReveal.ref} className="py-24 px-4" style={{ background: '#060d0c' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Our <span className="text-gradient">Equipment Catalogue</span>
            </h2>
            <p className="text-xl text-slate-400 mt-5 max-w-xl mx-auto">Available for short-term rent or outright purchase with clinical setup support.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {equipments.map((eq, i) => (
              <div
                key={i}
                className={`glass-card rounded-3xl p-7 flex flex-col justify-between group hover:shadow-2xl hover:shadow-teal-500/8 hover:border-teal-500/25 transition-all duration-300 ${gridReveal.visible ? `animate-fade-in-up delay-${(i % 4 + 1) * 100}` : 'opacity-0'}`}
              >
                <div>
                  <div className="text-5xl p-4 bg-white/4 border border-white/5 rounded-2xl w-fit leading-none mb-5 group-hover:scale-110 transition-transform duration-300">
                    {eq.icon}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${eq.tagColor}`}>{eq.tag}</span>
                  <h4 className="text-xl font-black text-white mt-3 mb-4 group-hover:text-gradient transition-all">{eq.name}</h4>

                  <div className="space-y-2">
                    {eq.features.map((f, fi) => (
                      <div key={fi} className="flex items-center space-x-2.5 text-sm text-slate-400">
                        <div className="h-1.5 w-1.5 rounded-full bg-teal-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-emerald-950/50 grid grid-cols-2 gap-3">
                  <Link
                    to={user ? "/dashboard" : "/login"}
                    className="flex items-center justify-center space-x-1.5 bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/20 text-teal-300 font-bold py-2.5 rounded-xl text-sm transition-all active:scale-95"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Rent</span>
                  </Link>
                  <Link
                    to={user ? "/dashboard" : "/login"}
                    className="flex items-center justify-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-300 font-bold py-2.5 rounded-xl text-sm transition-all active:scale-95"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Buy</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ PERKS ══════════════════════════════════════════ */}
      <section ref={perksReveal.ref} className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #060d0c 0%, #071512 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Why Choose <span className="text-gradient">PostMan Equipment?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, i) => (
              <div
                key={i}
                className={`glass-card p-8 rounded-3xl text-center flex flex-col items-center ${perksReveal.visible ? `animate-fade-in-up delay-${(i + 1) * 100}` : 'opacity-0'}`}
              >
                <div className="p-5 bg-white/4 rounded-2xl mb-5">{perk.icon}</div>
                <h3 className="text-xl font-black text-white mb-3">{perk.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════ */}
      <section className="py-20 px-4 border-t border-emerald-950/40" style={{ background: '#030808' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight">
            Need Equipment <span className="text-gradient">Delivered Today?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Register now and get your medical equipment order confirmed within minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to={user ? "/dashboard" : "/register"} className="btn-primary flex items-center space-x-2 text-lg">
              <span>Request Equipment Now</span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
            <Link to="/services" className="btn-ghost text-lg">View All Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EquipmentPage;
