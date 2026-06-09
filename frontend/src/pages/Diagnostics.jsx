import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layers, CheckCircle, Sparkles, ArrowUpRight, Clock, Shield, Zap } from 'lucide-react';

const useScrollReveal = (threshold = 0.02) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setVisible(true);
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

const tests = [
  { name: 'Full Body Health Checkup (80+ parameters)', tag: 'Comprehensive', tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: '🩸', desc: 'Includes CBC, Blood Sugar, LFT, KFT, Lipid Profile, Urine Routine, Thyroid Profile, HbA1c, and iron levels.' },
  { name: 'Home ECG Setup & Cardiologist Report',        tag: 'Cardiac',       tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',         icon: '💓', desc: 'Instant 12-lead Electrocardiogram conducted by certified technicians at home. Verified by a senior consultant cardiologist.' },
  { name: 'Diabetes Screen (HbA1c + Fasting Sugar)',    tag: 'Diabetes',      tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',       icon: '🔬', desc: 'Evaluates average blood glucose over 3 months along with instant fasting plasma sugar tests.' },
  { name: 'Thyroid Profile Plus (T3, T4, TSH, Anti-TPO)',tag: 'Thyroid',       tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',    icon: '💊', desc: 'Examines comprehensive thyroid performance, including autoimmune antibodies for thyroiditis assessments.' },
  { name: 'Lipid Panel & Cardiac Risk Index',          tag: 'Cardiovascular',tagColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',             icon: '🫀', desc: 'Measures HDL, LDL, VLDL, total cholesterol, triglycerides, and cholesterol ratios for stroke prevention.' },
  { name: 'Kidney Function & Electrolytes (KFT / RFT)', tag: 'Kidney',        tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',          icon: '🧪', desc: 'Checks blood urea, creatinine, uric acid, along with sodium, potassium, and chloride balances.' },
  { name: 'Liver Function & Bilirubin Audit (LFT)',     tag: 'Liver',         tagColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',    icon: '🧫', desc: 'Measures bilirubin, SGOT, SGPT, alkaline phosphatase, and protein ratios for hepatic safety.' },
  { name: 'Vitamin D3 & B12 Vitality Screening',        tag: 'Vitamins',      tagColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',    icon: '☀️', desc: 'Measures bone health vitality and nerve health parameter counts to address chronic fatigue.' },
  { name: 'Arthritis & Joint Inflammation Check',       tag: 'Orthopedic',    tagColor: 'text-red-400 bg-red-500/10 border-red-500/20',            icon: '🦴', desc: 'Includes Rheumatoid Factor (RA), Uric Acid, Calcium, ESR, and C-Reactive Protein (CRP).' },
  { name: 'Fever Profile (Dengue, Typhoid, Malaria)',   tag: 'Infectious',    tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',          icon: '🤒', desc: 'Rapid assessment panel for high fever, checking complete blood count, malaria antigen, and typhoid.' },
];

const howItWorks = [
  { step: '01', title: 'Book Online',            desc: 'Register on our platform and choose your desired test from our comprehensive catalogue.',       icon: <Sparkles className="h-7 w-7 text-emerald-400" /> },
  { step: '02', title: 'Technician Arrives',     desc: 'A certified phlebotomist arrives at your home at the scheduled time with sterile kits.',        icon: <Clock className="h-7 w-7 text-teal-400" /> },
  { step: '03', title: 'Safe Sample Collection', desc: 'Samples collected using 100% barcoded tamper-proof single-use sterile vials.',                  icon: <Shield className="h-7 w-7 text-sky-400" /> },
  { step: '04', title: 'Report in 12 Hours',     desc: 'Digital reports delivered directly to your dashboard and email within 12 hours.',                icon: <Zap className="h-7 w-7 text-amber-400" /> },
];

const DiagnosticsPage = () => {
  const { user } = useAuth();
  const heroReveal  = useScrollReveal();
  const howReveal   = useScrollReveal();
  const testsReveal = useScrollReveal();

  return (
    <div className="page-enter" style={{ background: '#060d0c' }}>

      {/* ══ PAGE HERO ══════════════════════════════════════ */}
      <section className="relative py-28 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #030808 0%, #060f14 60%, #060d0c 100%)' }}>
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-sky-500/6 blur-[100px] animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-teal-500/5 blur-[120px] animate-float-slow pointer-events-none" style={{ animationDelay: '2.5s' }} />

        <div ref={heroReveal.ref} className="relative max-w-4xl mx-auto text-center z-10">
          <div className={`inline-flex items-center space-x-2 bg-sky-500/8 border border-sky-500/20 px-4 py-2 rounded-full mb-6 ${heroReveal.visible ? 'animate-fade-in-down' : 'opacity-0'}`}>
            <Layers className="h-5 w-5 text-sky-400" />
            <span className="text-sm font-bold text-sky-400 uppercase tracking-widest">Hygienic Home Diagnostics</span>
          </div>
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6 ${heroReveal.visible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
            Lab Tests & Health <span className="text-gradient-cool">Screens From Home</span>
          </h1>
          <p className={`text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-10 ${heroReveal.visible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
            Skip hospital queues. Our NABL-certified lab assistants arrive with single-use sterile kits to collect samples in absolute comfort.
          </p>
          <div className={`flex flex-wrap justify-center gap-4 ${heroReveal.visible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
            {['NABL Accredited Labs', '100% Sterile Vials', 'E-Reports in 12 Hours', 'Certified Phlebotomists'].map(badge => (
              <div key={badge} className="flex items-center space-x-2 bg-sky-500/8 border border-sky-500/20 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-sky-400" />
                <span className="text-base font-semibold text-sky-300">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ HOW IT WORKS ═══════════════════════════════════ */}
      <section ref={howReveal.ref} className="py-24 px-4" style={{ background: '#060d0c' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-slate-400 mt-5 max-w-xl mx-auto">Simple, safe, and hassle-free — from booking to report in just 4 steps.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <div
                key={i}
                className={`glass-card p-8 rounded-3xl text-center flex flex-col items-center ${howReveal.visible ? `animate-fade-in-up delay-${(i + 1) * 100}` : 'opacity-0'}`}
              >
                <div className="text-6xl font-black text-white/5 mb-4 leading-none">{step.step}</div>
                <div className="p-4 rounded-2xl bg-white/5 mb-5">{step.icon}</div>
                <h3 className="text-xl font-black text-white mb-3">{step.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ TESTS LIST ═════════════════════════════════════ */}
      <section ref={testsReveal.ref} className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #060d0c 0%, #071512 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Popular <span className="text-gradient">Diagnostic Tests</span>
            </h2>
            <p className="text-xl text-slate-400 mt-5 max-w-xl mx-auto">All tests performed by certified technicians from NABL-accredited partner labs.</p>
          </div>

          <div className="flex flex-col space-y-5">
            {tests.map((test, i) => (
              <div
                key={i}
                className={`glass-card p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group ${testsReveal.visible ? `animate-fade-in-up delay-${(i % 4 + 1) * 100}` : 'opacity-0'}`}
              >
                <div className="flex items-center space-x-5 text-left">
                  <div className="text-4xl">{test.icon}</div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">{test.name}</h4>
                    <p className="text-base text-slate-400 leading-relaxed max-w-2xl">{test.desc}</p>
                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${test.tagColor}`}>
                      {test.tag}
                    </span>
                  </div>
                </div>
                <Link
                  to={user ? "/dashboard" : "/login"}
                  className="shrink-0 flex items-center space-x-2 bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/20 text-sky-300 font-bold px-6 py-3 rounded-xl text-base transition-all active:scale-95"
                >
                  <span>Book Now</span>
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════ */}
      <section className="py-20 px-4 border-t border-emerald-950/40" style={{ background: '#030808' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight">
            Schedule Your <span className="text-gradient">Home Diagnostic</span> Today
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Register and get your lab assistant booked within minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to={user ? "/dashboard" : "/register"} className="btn-primary flex items-center space-x-2 text-lg">
              <span>Book Diagnostic Pickup</span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
            <Link to="/services" className="btn-ghost text-lg">View All Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiagnosticsPage;
