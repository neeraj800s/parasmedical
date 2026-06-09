import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse, ShieldCheck, Award, Users, Clock, Target, ArrowUpRight,
  CheckCircle, Sparkles, Heart, Activity, Zap, Globe
} from 'lucide-react';

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

const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setCount(target);
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

const team = [
  { name: 'Dr. Arvind Mehta',     role: 'Chief Medical Officer',       specialty: 'Critical Care & Pulmonology',     initial: 'A', color: 'from-emerald-400 to-teal-600' },
  { name: 'Dr. Priya Nambiar',   role: 'Head of Nursing Services',    specialty: 'Geriatric & Post-Surgical Care',  initial: 'P', color: 'from-teal-400 to-cyan-600' },
  { name: 'Dr. Rohan Gupta',     role: 'Physiotherapy Director',      specialty: 'Neuro-Rehabilitation & Sports',   initial: 'R', color: 'from-sky-400 to-blue-600' },
  { name: 'Ms. Kavya Srinivas',  role: 'Diagnostics Lab Head',        specialty: 'NABL Pathology & Haematology',    initial: 'K', color: 'from-violet-400 to-purple-600' },
  { name: 'Mr. Sanjay Khare',    role: 'Operations & Logistics Head', specialty: 'Supply Chain & Equipment',        initial: 'S', color: 'from-amber-400 to-orange-600' },
  { name: 'Dr. Sunita Reddy',    role: 'Patient Experience Officer',  specialty: 'Family Medicine & Telemedicine',  initial: 'S', color: 'from-rose-400 to-pink-600' },
];

const milestones = [
  { year: '2018', event: 'Founded Paras Medical Store & AuraCare with a team of 5 clinical professionals, setting up our central hub in Mansarover, Jaipur.' },
  { year: '2019', event: 'Launched home nursing and ICU equipment rental services, partnering with 3 leading multi-specialty hospitals in Rajasthan.' },
  { year: '2020', event: 'Expanded support to home isolation patients, delivering over 1,500 oxygen concentrators and cylinders across Jaipur during critical health emergencies.' },
  { year: '2021', event: 'Crossed 5,000 patients served, launching dedicated diagnostics home-collection and advanced physiotherapy verticals.' },
  { year: '2022', event: 'Received premium ISO quality certifications for medical equipment calibration. Expanded direct delivery fleet to rural areas around Jaipur.' },
  { year: '2023', event: 'Reached milestone of 10,000+ patients served in Rajasthan. Over 2,500 qualified caretakers registered in our healthcare database.' },
  { year: '2024', event: 'Established an automated device sterilization and testing facility in Jaipur, ensuring hospital-level sanitization for all rented ICU setups.' },
  { year: '2025', event: 'Partnered with key diagnostics labs to guarantee NABL-accredited test reports within 12 hours of home collection.' },
  { year: '2026', event: 'Launched digital real-time vital telemetry logging for home ICU patients, bridging the gap between home recovery and remote hospital consulting.' },
];

const values = [
  { icon: <Heart       className="h-8 w-8 text-rose-400"    />, bg: 'bg-rose-500/10',    border: 'border-rose-500/20',    title: 'Compassion',   desc: 'Every decision we make is centered around the emotional and physical wellbeing of patients and families.' },
  { icon: <ShieldCheck className="h-8 w-8 text-emerald-400" />, bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', title: 'Integrity',    desc: 'Full transparency in clinical practices, caregiver credentials, and service quality without compromise.' },
  { icon: <Zap         className="h-8 w-8 text-amber-400"   />, bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   title: 'Excellence',   desc: 'NABH-compliant protocols, continuous staff training, and zero tolerance for substandard care.' },
  { icon: <Globe       className="h-8 w-8 text-sky-400"     />, bg: 'bg-sky-500/10',     border: 'border-sky-500/20',     title: 'Accessibility',desc: 'Bringing premium clinical care to every home, regardless of geography, age, or medical complexity.' },
];

const AboutPage = () => {
  const heroReveal      = useScrollReveal();
  const missionReveal   = useScrollReveal();
  const statsReveal     = useScrollReveal();
  const valuesReveal    = useScrollReveal();
  const teamReveal      = useScrollReveal();
  const timelineReveal  = useScrollReveal();
  const { count: c1, ref: r1 } = useCounter(10000);
  const { count: c2, ref: r2 } = useCounter(2500);
  const { count: c3, ref: r3 } = useCounter(25);

  return (
    <div className="page-enter" style={{ background: '#060d0c' }}>

      {/* ══ PAGE HERO ══════════════════════════════════════ */}
      <section className="relative py-28 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #030808 0%, #071410 60%, #060d0c 100%)' }}>
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-emerald-500/6 blur-[120px] animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-teal-500/5 blur-[100px] animate-float-slow pointer-events-none" style={{ animationDelay: '2s' }} />

        <div ref={heroReveal.ref} className="relative max-w-4xl mx-auto text-center z-10">
          <div className={`inline-flex items-center space-x-2 bg-emerald-500/8 border border-emerald-500/20 px-4 py-2 rounded-full mb-6 ${heroReveal.visible ? 'animate-fade-in-down' : 'opacity-0'}`}>
            <HeartPulse className="h-5 w-5 text-emerald-400 animate-bounce-gentle" />
            <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Our Story & Mission</span>
          </div>
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6 ${heroReveal.visible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
            Healing Begins <span className="text-gradient">Where the Heart Is</span>
          </h1>
          <p className={`text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto ${heroReveal.visible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
            AuraCare was born from a simple belief — patients heal faster, more safely, and more happily in the comfort of their own home, surrounded by the people they love.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ MISSION ════════════════════════════════════════ */}
      <section ref={missionReveal.ref} className="py-24 px-4" style={{ background: '#060d0c' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={missionReveal.visible ? 'animate-fade-in-left' : 'opacity-0'}>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/8 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
              <Target className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
              Democratizing<br /><span className="text-gradient">Clinical Excellence</span>
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-6">
              We believe that world-class medical care shouldn't be limited to hospital walls. Our mission is to deliver hospital-grade clinical services — ICU setups, specialized nursing, physiotherapy, diagnostics, and medical equipment — directly into the homes of those who need it most.
            </p>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              We partner with NABH-certified hospitals, NABL-accredited laboratories, and rigorously verified clinical professionals to create a care ecosystem that is safe, transparent, and deeply empathetic.
            </p>
            <div className="flex flex-col space-y-3">
              {['100% NABH compliant clinical processes', 'Minimum 2-year experience mandatory for all staff', 'Real-time health monitoring & emergency escalation', 'Serving 25+ cities across India with 2,500+ caregivers'].map((point, i) => (
                <div key={i} className="flex items-center space-x-3 text-base text-slate-300">
                  <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-5 ${missionReveal.visible ? 'animate-fade-in-right delay-200' : 'opacity-0'}`}>
            {[
              { icon: <HeartPulse className="h-10 w-10 text-emerald-400" />, bg: 'bg-emerald-500/8', border: 'border-emerald-500/15', title: 'Clinical First',    desc: 'Every service designed with clinical safety as the primary driver.' },
              { icon: <Users      className="h-10 w-10 text-teal-400"    />, bg: 'bg-teal-500/8',   border: 'border-teal-500/15',   title: 'Patient-Centric', desc: 'Tailored care plans built around individual patient needs.' },
              { icon: <Activity   className="h-10 w-10 text-sky-400"     />, bg: 'bg-sky-500/8',    border: 'border-sky-500/15',    title: 'Data-Driven',     desc: 'Real-time telemetry and vitals monitoring for proactive care.' },
              { icon: <Award      className="h-10 w-10 text-amber-400"   />, bg: 'bg-amber-500/8',  border: 'border-amber-500/15',  title: 'Accredited',      desc: 'NABH-compliant protocols recognized by leading hospitals.' },
            ].map((card, i) => (
              <div key={i} className={`glass-card p-6 rounded-2xl border ${card.border} flex flex-col space-y-4`}>
                <div className={`p-3 rounded-xl ${card.bg} w-fit`}>{card.icon}</div>
                <h4 className="text-xl font-black text-white">{card.title}</h4>
                <p className="text-base text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ STATS ══════════════════════════════════════════ */}
      <section ref={statsReveal.ref} className="py-20 px-4" style={{ background: 'linear-gradient(180deg, #071512 0%, #060d0c 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <div ref={r1} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { count: c1, ref: r1, suffix: '+', label: 'Patients Served',    color: 'text-emerald-400' },
              { count: c2, ref: r2, suffix: '+', label: 'Verified Caregivers', color: 'text-teal-400' },
              { count: c3, ref: r3, suffix: '+', label: 'Cities Covered',      color: 'text-sky-400' },
              { count: 4.9, ref: null, suffix: '/5', label: 'Patient Rating',  color: 'text-amber-400' },
            ].map((stat, i) => (
              <div key={i} className={`text-center ${statsReveal.visible ? `animate-fade-in-up delay-${(i + 1) * 100}` : 'opacity-0'}`}>
                <div ref={stat.ref} className={`text-5xl md:text-6xl font-black ${stat.color} mb-2`}>
                  {i === 3 ? '4.9' : stat.count.toLocaleString()}{stat.suffix}
                </div>
                <p className="text-base text-slate-400 uppercase tracking-widest font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ VALUES ═════════════════════════════════════════ */}
      <section ref={valuesReveal.ref} className="py-24 px-4" style={{ background: '#060d0c' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-rose-500/8 border border-rose-500/20 px-4 py-2 rounded-full mb-6">
              <Heart className="h-5 w-5 text-rose-400" />
              <span className="text-sm font-bold text-rose-400 uppercase tracking-widest">Core Values</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              What Drives <span className="text-gradient">Everything We Do</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {values.map((v, i) => (
              <div
                key={i}
                className={`glass-card p-8 rounded-3xl border ${v.border} flex flex-col ${valuesReveal.visible ? `animate-fade-in-up delay-${(i + 1) * 100}` : 'opacity-0'}`}
              >
                <div className={`p-4 ${v.bg} rounded-2xl w-fit mb-6`}>{v.icon}</div>
                <h3 className="text-2xl font-black text-white mb-3">{v.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ TEAM ═══════════════════════════════════════════ */}
      <section ref={teamReveal.ref} className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #060d0c 0%, #071512 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-teal-500/8 border border-teal-500/20 px-4 py-2 rounded-full mb-6">
              <Users className="h-5 w-5 text-teal-400" />
              <span className="text-sm font-bold text-teal-400 uppercase tracking-widest">Leadership Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Meet the <span className="text-gradient">Clinical Experts</span>
            </h2>
            <p className="text-xl text-slate-400 mt-5 max-w-xl mx-auto">A team of passionate healthcare leaders with decades of combined clinical excellence.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className={`glass-card p-8 rounded-3xl flex flex-col items-center text-center group hover:shadow-2xl hover:shadow-emerald-500/8 ${teamReveal.visible ? `animate-fade-in-up delay-${(i % 3 + 1) * 100}` : 'opacity-0'}`}
              >
                <div className={`h-24 w-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center font-black text-4xl text-slate-950 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {member.initial}
                </div>
                <h4 className="text-xl font-black text-white mb-1">{member.name}</h4>
                <p className="text-base font-bold text-emerald-400 mb-2">{member.role}</p>
                <p className="text-sm text-slate-400 font-medium">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ TIMELINE ═══════════════════════════════════════ */}
      <section ref={timelineReveal.ref} className="py-24 px-4" style={{ background: '#060d0c' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-amber-500/8 border border-amber-500/20 px-4 py-2 rounded-full mb-6">
              <Clock className="h-5 w-5 text-amber-400" />
              <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">Our Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              A Story of <span className="text-gradient">Growth & Impact</span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/40 via-teal-500/20 to-transparent" />

            <div className="flex flex-col space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start space-x-8 ${timelineReveal.visible ? `animate-fade-in-left delay-${(i + 1) * 100}` : 'opacity-0'}`}
                >
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="h-4 w-4 rounded-full bg-emerald-400 border-4 border-emerald-950 z-10 animate-glow-pulse" />
                  </div>
                  <div className="glass-card p-6 rounded-2xl flex-1 -mt-1">
                    <span className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-2 block">{m.year}</span>
                    <p className="text-lg text-slate-300 leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ SECTION ══════════════════════════════════════ */}
      <section className="py-24 px-4 border-t border-emerald-950/60" style={{ background: '#040b09' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white tracking-tight">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-lg text-slate-400 mt-4 font-light">Everything you need to know about our home clinical care and operations.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "What measures do you take to verify clinical staff?",
                a: "Every nurse, physiotherapist, and caregiver in our network undergoes a strict three-layer verification process. This includes biometric background checks, credential validation against university registration databases, and practical clinical skill evaluation by our senior medical advisory board."
              },
              {
                q: "How does the home ICU setup work?",
                a: "Once requested, our clinical operations lead coordinates with the patient's primary hospital consultant. We transport, calibrate, and set up all medical devices (ventilators, monitors, beds) within 4 hours. A critical care nurse is stationed at the home to monitor vitals and handle emergency escalation."
              },
              {
                q: "Can I rent medical equipment on a monthly basis?",
                a: "Yes. All our medical devices (concentrators, BiPAP, motorized beds, syringe pumps) are available for both weekly and monthly rental options. We also offer purchase options with manufacturer warranties and continuous calibration support."
              },
              {
                q: "How quickly are diagnostics lab reports generated?",
                a: "Phlebotomists collect blood and urine samples in sterile containers at your home. The samples are immediately logged and transported in temperature-controlled boxes to our partner NABL-accredited labs. Most routine reports (sugar, liver, kidney, blood profiles) are uploaded to your dashboard within 12 hours."
              },
              {
                q: "What is your refund and cancellation policy?",
                a: "We understand that clinical requirements can change rapidly. You can cancel any ongoing home care package or return rented medical devices at any time. Refunds for unused days are processed back to your original payment method within 3-5 business days."
              }
            ].map((faq, idx) => (
              <div key={idx} className="glass-card p-6 md:p-8 rounded-2xl text-left border border-emerald-950 hover:border-emerald-500/20">
                <h4 className="text-xl font-bold text-white mb-3 flex items-start">
                  <span className="text-emerald-400 font-black mr-3">Q.</span>
                  {faq.q}
                </h4>
                <p className="text-base text-slate-400 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════ */}
      <section className="py-20 px-4 border-t border-emerald-950/40" style={{ background: 'linear-gradient(135deg, #030808 0%, #071410 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <Sparkles className="h-12 w-12 text-emerald-400 mx-auto mb-6 animate-spin-slow" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight">
            Join the <span className="text-gradient">AuraCare Family</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Experience clinical excellence and compassionate care — right in the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/register" className="btn-primary flex items-center space-x-2 text-lg">
              <span>Get Started Today</span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
            <Link to="/services" className="btn-ghost text-lg">Explore Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
