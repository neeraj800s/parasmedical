import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Activity, UserCheck, Heart, Stethoscope, Layers, Award,
  ShieldCheck, ArrowUpRight, CheckCircle, Sparkles, ChevronRight
} from 'lucide-react';

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

const services = [
  {
    id: 'icu',
    icon: <Activity className="h-8 w-8" />,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    tag: 'Critical Care',
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    title: 'ICU Setup at Home',
    desc: 'Complete hospital-grade intensive care setup at home, monitored by senior pulmonologists and critical-care trained nurses round the clock.',
    features: ['24/7 ICU-trained nurse', 'Ventilator / BiPAP setup', 'Cardiac monitoring', 'Daily doctor supervision'],
    glowColor: 'hover:shadow-emerald-500/10',
    borderColor: 'hover:border-emerald-500/30',
  },
  {
    id: 'nursing',
    icon: <UserCheck className="h-8 w-8" />,
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-500/10',
    tag: 'Post-Op & Chronic',
    tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    title: 'Specialized Home Nursing',
    desc: 'Professional nursing for post-surgery recovery, wound dressing, tracheostomy care, injections, and infusion management.',
    features: ['12-hour or 24-hour shifts', 'Geriatric-trained nurses', 'Wound & suture care', 'Vitals charting & reports'],
    glowColor: 'hover:shadow-teal-500/10',
    borderColor: 'hover:border-teal-500/30',
  },
  {
    id: 'physio',
    icon: <Heart className="h-8 w-8" />,
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10',
    tag: 'Rehabilitation',
    tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    title: 'Physiotherapy at Home',
    desc: 'Tailored rehabilitation for stroke recovery, orthopedic disorders, spine injuries, sports strains, and geriatric mobility training.',
    features: ['Certified manual therapist', 'Custom exercise plans', 'Pain management therapy', 'Post-stroke rehab expert'],
    glowColor: 'hover:shadow-rose-500/10',
    borderColor: 'hover:border-rose-500/30',
  },
  {
    id: 'doctor',
    icon: <Stethoscope className="h-8 w-8" />,
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10',
    tag: 'Clinical Care',
    tagColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    title: 'Doctor Visit at Home',
    desc: 'Expert general physicians and specialists visiting you for diagnoses, medication review, and primary health assessments.',
    features: ['Senior physicians', 'Detailed health reports', 'Prescription updates', 'Geriatric health audits'],
    glowColor: 'hover:shadow-indigo-500/10',
    borderColor: 'hover:border-indigo-500/30',
  },
  {
    id: 'caregiver',
    icon: <Award className="h-8 w-8" />,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    tag: 'Daily Assistance',
    tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    title: 'Trained Caregivers',
    desc: 'Compassionate attendants assisting with physical support, hygiene, feeding, medication reminders, and companionship.',
    features: ['Fully background verified', 'CPR & emergency trained', 'Empathetic personality eval', '12-hour or 24-hour options'],
    glowColor: 'hover:shadow-amber-500/10',
    borderColor: 'hover:border-amber-500/30',
  },
  {
    id: 'diagnostics',
    icon: <Layers className="h-8 w-8" />,
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-500/10',
    tag: 'Instant Labs',
    tagColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    title: 'At-Home Diagnostics',
    desc: 'Hassle-free collection of blood, urine, or stool samples. Mobile ECG, X-Ray, and Holter monitoring in absolute comfort.',
    features: ['NABL certified labs', 'Digital reports in 12 hours', 'Certified phlebotomists', 'Mobile diagnostic devices'],
    glowColor: 'hover:shadow-sky-500/10',
    borderColor: 'hover:border-sky-500/30',
  },
];

const pillars = [
  {
    key: 'excellence',
    label: 'Clinical Standards',
    icon: <Activity className="h-5 w-5" />,
    title: 'Clinical Excellence & Safety Protocols',
    points: [
      'Adherence to strict NABH quality frameworks and clinical guidelines.',
      'Continuous training audits led by senior hospital administrators.',
      'Standardized infection-control policies for home environments.',
      'Immediate escalation channels to affiliated super-specialty hospitals.',
    ],
  },
  {
    key: 'caregivers',
    label: 'Caregiver Verification',
    icon: <UserCheck className="h-5 w-5" />,
    title: 'Rigorous Caregiver Background Verification',
    points: [
      'Mandatory biometric background checks and national identity verification.',
      'Psychometric evaluation to ensure empathy and patience.',
      'Minimum 2 years of prior clinical hospital experience required.',
      'Ongoing BLS and emergency first-aid drills every quarter.',
    ],
  },
  {
    key: 'support',
    label: '24/7 Medical Support',
    icon: <ShieldCheck className="h-5 w-5" />,
    title: '24/7 Clinical Support Center & Escort',
    points: [
      'Emergency clinical desk staffed with post-graduate doctors always.',
      'Real-time vital tracking system with immediate alert flags.',
      'Coordination with emergency ambulance partners within minutes.',
      'Instant caregiver replacement for uninterrupted care delivery.',
    ],
  },
];

const ServicesPage = () => {
  const { user } = useAuth();
  const [activePillar, setActivePillar] = useState('excellence');
  const heroReveal    = useScrollReveal();
  const gridReveal    = useScrollReveal();
  const pillarReveal  = useScrollReveal();

  return (
    <div className="page-enter" style={{ background: '#060d0c' }}>

      {/* ══ PAGE HERO ══════════════════════════════════════ */}
      <section className="relative py-28 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #030808 0%, #071410 60%, #060d0c 100%)' }}>
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-emerald-500/6 blur-[100px] animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-teal-500/5 blur-[120px] animate-float-slow pointer-events-none" style={{ animationDelay: '2s' }} />

        <div ref={heroReveal.ref} className="relative max-w-4xl mx-auto text-center z-10">
          <div className={`inline-flex items-center space-x-2 bg-emerald-500/8 border border-emerald-500/20 px-4 py-2 rounded-full mb-6 ${heroReveal.visible ? 'animate-fade-in-down' : 'opacity-0'}`}>
            <Sparkles className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Clinical Services Directory</span>
          </div>
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6 ${heroReveal.visible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
            Our Dedicated <span className="text-gradient">Home Care</span> Offerings
          </h1>
          <p className={`text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto ${heroReveal.visible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
            From basic physical assistance to absolute intensive critical setup — fully managed healthcare structured under expert clinical leadership.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ SERVICES GRID ══════════════════════════════════ */}
      <section ref={gridReveal.ref} className="py-24 px-4" style={{ background: '#060d0c' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl ${service.glowColor} border border-emerald-950/60 ${service.borderColor} transition-all duration-300 ${gridReveal.visible ? `animate-fade-in-up delay-${(i % 3 + 1) * 100}` : 'opacity-0'}`}
            >
              {/* Corner glow */}
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-white/2 blur-xl group-hover:bg-white/4 transition-all" />

              <div className="relative z-10 space-y-5">
                <div className="flex justify-between items-start">
                  <div className={`p-4 ${service.iconBg} rounded-2xl ${service.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider ${service.tagColor}`}>
                    {service.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-gradient transition-all">{service.title}</h3>
                  <p className="text-base text-slate-400 mt-3 leading-relaxed">{service.desc}</p>
                </div>

                <div className="pt-4 border-t border-emerald-950/60 space-y-2.5">
                  {service.features.map((f, fi) => (
                    <div key={fi} className="flex items-center space-x-3 text-base text-slate-300">
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-emerald-950/60">
                <Link
                  to={user ? "/dashboard" : "/login"}
                  className={`w-full flex items-center justify-center space-x-2 py-3.5 rounded-2xl text-base font-bold border transition-all duration-200 ${service.iconBg} ${service.iconColor} border-current/20 hover:opacity-80 active:scale-95`}
                >
                  <span>Book This Service</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ SPECIALIZED CLINICAL PROGRAMS ════════════════ */}
      <section className="py-24 px-4 border-t border-emerald-950/60" style={{ background: '#040b09' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Specialized Clinical <span className="text-gradient">Care Programs</span>
            </h2>
            <p className="text-lg text-slate-400 mt-4 max-w-3xl mx-auto">
              Our clinical protocols are built in partnership with leading cardiologists, pulmonologists, and orthopedicians to guarantee standardized health outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Post-Stroke Neuro Rehab",
                desc: "Focused on regaining motor skills, speech therapy, swallowing assistance, and neuromuscular electrical stimulation to rebuild independence.",
                points: ["Stroke assessment scale monitoring", "Functional electrical stimulation", "Speech & swallowing therapy", "Cognitive retraining exercises"]
              },
              {
                title: "Cardiopulmonary Care",
                desc: "Designed for patients with COPD, post-CABG heart surgery, asthma, or chronic lung diseases to restore optimal oxygenation and physical capacity.",
                points: ["Incentive spirometry tracking", "Chest physiotherapy & drainage", "Vitals charting & BP/ECG audits", "Controlled breathing exercises"]
              },
              {
                title: "Advanced Wound & Suture Care",
                desc: "Aseptic dressing procedures for surgical incisions, pressure ulcers, diabetic wounds, and tracheostomies to avoid hospital-acquired infections.",
                points: ["Sterile dressing protocols", "Vacuum-assisted wound closure (VAC)", "Necrotic tissue debridement support", "Suture removal and infection audits"]
              },
              {
                title: "Geriatric Palliative Programs",
                desc: "Comprehensive companion and clinical care for elderly patients managing cancer, Parkinson's, dementia, or severe arthritis.",
                points: ["Pain management telemetry", "Daily living activity assistance", "Cognitive & memory stimulation", "Medication reconciliation audits"]
              },
              {
                title: "Orthopedic & Joint Recovery",
                desc: "Specialized post-total knee replacement (TKR) or total hip replacement (THR) recovery programs to reduce stiffness and improve gait.",
                points: ["Gait & balance assessment", "Continuous passive motion support", "Muscle strengthening sessions", "Home safety environmental checks"]
              },
              {
                title: "Tracheostomy & Ventilator Care",
                desc: "High-complexity respiratory care managed by senior clinical nurses, including tube changes, suctioning, decannulation, and ventilator weaning.",
                points: ["Sterile suctioning protocols", "Emergency decannulation safety", "Weaning checklist monitoring", "Humidification & oxygen tracking"]
              }
            ].map((prog, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border border-emerald-950/60 hover:border-emerald-500/25 flex flex-col justify-between text-left">
                <div>
                  <h4 className="text-2xl font-black text-white mb-3">{prog.title}</h4>
                  <p className="text-base text-slate-400 leading-relaxed mb-6">{prog.desc}</p>
                </div>
                <div className="space-y-2.5 pt-4 border-t border-emerald-950/60">
                  {prog.points.map((p, pi) => (
                    <div key={pi} className="flex items-center space-x-3 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ SAFETY PILLARS ═════════════════════════════════ */}
      <section ref={pillarReveal.ref} className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #060d0c 0%, #071512 100%)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

          <div className={`lg:col-span-5 flex flex-col space-y-7 ${pillarReveal.visible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/8 border border-emerald-500/20 px-4 py-2 rounded-full w-fit">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Clinical Quality & Safety</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Safety Protocols That <span className="text-gradient">Outperform</span> Standard Care
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              We understand that bringing medical professionals home requires total transparency, safety, and strict accountability.
            </p>

            <div className="flex flex-col space-y-3">
              {pillars.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActivePillar(tab.key)}
                  className={`flex items-center space-x-4 text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    activePillar === tab.key
                      ? 'border-emerald-500/30 bg-emerald-950/50 text-emerald-400'
                      : 'border-emerald-950/50 bg-transparent text-slate-400 hover:border-emerald-900/60'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${activePillar === tab.key ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-900 text-slate-500'} transition-colors`}>
                    {tab.icon}
                  </div>
                  <span className="text-base font-bold">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`lg:col-span-7 ${pillarReveal.visible ? 'animate-fade-in-right delay-200' : 'opacity-0'}`}>
            {pillars.filter(p => p.key === activePillar).map((pillar) => (
              <div key={pillar.key} className="glass-card-dark rounded-3xl p-8 md:p-10 border border-emerald-900/20 relative animate-scale-in">
                <div className="absolute top-6 right-6 text-emerald-400/8 text-9xl font-black select-none pointer-events-none">
                  {pillar.key === 'excellence' ? '01' : pillar.key === 'caregivers' ? '02' : '03'}
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-emerald-300 mb-8">{pillar.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {pillar.points.map((point, i) => (
                    <div key={i} className="flex items-start space-x-4 bg-emerald-950/25 border border-emerald-900/15 p-5 rounded-2xl">
                      <div className="p-1.5 rounded-full bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <p className="text-base text-slate-300 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════ */}
      <section className="py-20 px-4 border-t border-emerald-950/40" style={{ background: '#030808' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight">
            Ready to <span className="text-gradient">Book Your Service?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Register now and get matched with a certified clinician within 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to={user ? "/dashboard" : "/register"} className="btn-primary flex items-center space-x-2 text-lg">
              <span>Book a Service Now</span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
            <Link to="/about" className="btn-ghost text-lg">
              About PostMan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
