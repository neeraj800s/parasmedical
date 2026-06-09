import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, 
  Calendar, 
  Truck, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Plus, 
  Sliders, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Heart,
  TrendingUp,
  UserCheck,
  ClipboardList,
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings'); // bookings, vitals, equipment, admin-bookings, admin-equipment

  // Patient states
  const [bookings, setBookings] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [equipmentOrders, setEquipmentOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Admin states
  const [adminBookings, setAdminBookings] = useState([]);
  const [adminEquipment, setAdminEquipment] = useState([]);

  // Booking Form State
  const [serviceType, setServiceType] = useState('Home Nursing');
  const [patientName, setPatientName] = useState(user ? user.name : '');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Female');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning (8 AM - 12 PM)');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [bookingError, setBookingError] = useState('');

  // Vitals Form State
  const [bpSystolic, setBpSystolic] = useState('');
  const [bpDiastolic, setBpDiastolic] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [oxygenLevel, setOxygenLevel] = useState('');
  const [temperature, setTemperature] = useState('');
  const [vitalsSuccess, setVitalsSuccess] = useState('');
  const [vitalsError, setVitalsError] = useState('');

  // Equipment Form State
  const [eqName, setEqName] = useState('Oxygen Concentrator 5L');
  const [eqType, setEqType] = useState('Rent');
  const [eqDuration, setEqDuration] = useState(1);
  const [eqAddress, setEqAddress] = useState('');
  const [eqPhone, setEqPhone] = useState('');
  const [eqSuccess, setEqSuccess] = useState('');
  const [eqError, setEqError] = useState('');

  // Admin assignment state
  const [assignCaregiver, setAssignCaregiver] = useState({});

  const token = localStorage.getItem('auracare_token');

  // Fetch patient data
  const fetchPatientData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      // Fetch bookings
      const bRes = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const bData = await bRes.json();
      if (bData.success) setBookings(bData.bookings);

      // Fetch vitals
      const vRes = await fetch(`${import.meta.env.VITE_API_URL}/vitals`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const vData = await vRes.json();
      if (vData.success) setVitals(vData.vitals);

      // Fetch equipment orders
      const eRes = await fetch(`${import.meta.env.VITE_API_URL}/equipment`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const eData = await eRes.json();
      if (eData.success) setEquipmentOrders(eData.orders);

    } catch (err) {
      console.error('Error fetching dashboard patient data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch admin data
  const fetchAdminData = async () => {
    if (!token || user?.role !== 'admin') return;
    setLoading(true);
    try {
      // Fetch all bookings
      const bRes = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const bData = await bRes.json();
      if (bData.success) setAdminBookings(bData.bookings);

      // Fetch all equipment orders
      const eRes = await fetch(`${import.meta.env.VITE_API_URL}/equipment`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const eData = await eRes.json();
      if (eData.success) setAdminEquipment(eData.orders);

    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        setActiveTab('admin-bookings');
        fetchAdminData();
      } else {
        setActiveTab('bookings');
        fetchPatientData();
      }
    }
  }, [user]);

  // Handle Bookings Submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingSuccess('');
    setBookingError('');

    if (!patientName || !patientAge || !contactNumber || !address || !city || !preferredDate) {
      setBookingError('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceType,
          patientName,
          patientAge: Number(patientAge),
          patientGender,
          contactNumber,
          address,
          city,
          preferredDate,
          preferredSlot,
          additionalNotes
        })
      });

      const data = await response.json();
      if (data.success) {
        setBookingSuccess('AuraCare Booking created successfully! A clinician will review it.');
        // Reset form
        setPatientAge('');
        setContactNumber('');
        setAddress('');
        setCity('');
        setPreferredDate('');
        setAdditionalNotes('');
        fetchPatientData();
      } else {
        setBookingError(data.message);
      }
    } catch (err) {
      setBookingError('Failed to connect to homecare booking servers');
    }
  };

  // Handle User Cancelling Booking
  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'Cancelled' })
      });
      const data = await response.json();
      if (data.success) {
        fetchPatientData();
      }
    } catch (err) {
      console.error('Cancel booking error:', err);
    }
  };

  // Handle Vitals Submission
  const handleVitalsSubmit = async (e) => {
    e.preventDefault();
    setVitalsSuccess('');
    setVitalsError('');

    if (!bpSystolic && !bpDiastolic && !bloodSugar && !heartRate && !oxygenLevel && !temperature) {
      setVitalsError('Please enter at least one health vital value');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/vitals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bloodPressureSystolic: bpSystolic ? Number(bpSystolic) : undefined,
          bloodPressureDiastolic: bpDiastolic ? Number(bpDiastolic) : undefined,
          bloodSugar: bloodSugar ? Number(bloodSugar) : undefined,
          heartRate: heartRate ? Number(heartRate) : undefined,
          oxygenLevel: oxygenLevel ? Number(oxygenLevel) : undefined,
          temperature: temperature ? Number(temperature) : undefined
        })
      });

      const data = await response.json();
      if (data.success) {
        setVitalsSuccess('Daily vitals logged successfully!');
        setBpSystolic('');
        setBpDiastolic('');
        setBloodSugar('');
        setHeartRate('');
        setOxygenLevel('');
        setTemperature('');
        fetchPatientData();
      } else {
        setVitalsError(data.message);
      }
    } catch (err) {
      setVitalsError('Server error while saving patient vitals');
    }
  };

  // Handle Equipment Rental
  const handleEquipmentSubmit = async (e) => {
    e.preventDefault();
    setEqSuccess('');
    setEqError('');

    if (!eqAddress || !eqPhone) {
      setEqError('Please provide delivery address and mobile contact');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/equipment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          equipmentName: eqName,
          bookingType: eqType,
          durationWeeks: eqType === 'Rent' ? Number(eqDuration) : undefined,
          deliveryAddress: eqAddress,
          contactNumber: eqPhone
        })
      });

      const data = await response.json();
      if (data.success) {
        setEqSuccess('Medical equipment request filed successfully!');
        setEqAddress('');
        setEqPhone('');
        fetchPatientData();
      } else {
        setEqError(data.message);
      }
    } catch (err) {
      setEqError('Server error while booking medical equipment');
    }
  };

  // Admin: Update Booking status/caregiver
  const handleAdminUpdateBooking = async (id, currentStatus) => {
    const booking = adminBookings.find(b => b._id === id);
    const assignedStaff = assignCaregiver[id] !== undefined ? assignCaregiver[id] : (booking?.caregiverName || 'Not Assigned');
    let nextStatus = currentStatus;
    if (currentStatus === 'Pending') nextStatus = 'Confirmed';
    else if (currentStatus === 'Confirmed') nextStatus = 'Completed';

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: nextStatus,
          caregiverName: assignedStaff
        })
      });

      const data = await response.json();
      if (data.success) {
        fetchAdminData();
      }
    } catch (err) {
      console.error('Admin update booking error:', err);
    }
  };

  // Admin: Save clinician assignment only
  const handleUpdateCaregiverOnly = async (id) => {
    const booking = adminBookings.find(b => b._id === id);
    const assignedStaff = assignCaregiver[id] !== undefined ? assignCaregiver[id] : (booking?.caregiverName || 'Not Assigned');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: booking.status,
          caregiverName: assignedStaff || 'Not Assigned'
        })
      });

      const data = await response.json();
      if (data.success) {
        alert('Clinician assignment saved successfully!');
        fetchAdminData();
      }
    } catch (err) {
      console.error('Admin update caregiver error:', err);
    }
  };

  // Admin: Cancel Booking
  const handleAdminCancelBooking = async (id) => {
    if (!window.confirm('Reject / Cancel this booking?')) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'Cancelled' })
      });
      const data = await response.json();
      if (data.success) {
        fetchAdminData();
      }
    } catch (err) {
      console.error('Admin cancel booking error:', err);
    }
  };

  // Admin: Update Equipment order status
  const handleAdminUpdateEquipment = async (id, nextStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/equipment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await response.json();
      if (data.success) {
        fetchAdminData();
      }
    } catch (err) {
      console.error('Admin update equipment order error:', err);
    }
  };

  // Vitals range evaluation (Dark mode friendly classes)
  const getSugarWarning = (val) => {
    if (!val) return null;
    if (val < 70) return { label: 'Hypoglycemia (Low Sugar)', color: 'text-amber-400 bg-amber-950/40 border-amber-900/30' };
    if (val > 140 && val <= 180) return { label: 'Pre-diabetic Sugar', color: 'text-amber-400 bg-amber-950/40 border-amber-900/30' };
    if (val > 180) return { label: 'Hyperglycemia (High Sugar)', color: 'text-rose-400 bg-rose-950/40 border-rose-900/30' };
    return { label: 'Normal Blood Sugar', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-900/30' };
  };

  const getOxygenWarning = (val) => {
    if (!val) return null;
    if (val < 95) return { label: 'Hypoxia (Oxygen Low)', color: 'text-rose-400 bg-rose-950/40 border-rose-900/30 animate-pulse' };
    return { label: 'Normal Oxygen', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-900/30' };
  };

  const getBPWarning = (sys, dia) => {
    if (!sys && !dia) return null;
    if (sys > 140 || dia > 90) return { label: 'Hypertension (High BP)', color: 'text-rose-400 bg-rose-950/40 border-rose-900/30' };
    if (sys < 90 || dia < 60) return { label: 'Hypotension (Low BP)', color: 'text-amber-400 bg-amber-950/40 border-amber-900/30' };
    return { label: 'Normal BP', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-900/30' };
  };

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#060d0c] hero-grid">
        <div className="text-center p-8 md:p-10 glass-card-dark rounded-3xl max-w-md w-full animate-scale-in">
          <Activity className="h-14 w-14 text-rose-500 animate-pulse mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Secure Vault Session Expired</h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Please log in or register to access the secure patient and clinical dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060d0c] text-[#e2e8f0] py-10 px-4 md:px-8 hero-grid">
      <div className="max-w-7xl mx-auto flex flex-col space-y-10">
        
        {/* Welcome Header */}
        <div className="glass-card-dark rounded-3xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center border border-emerald-500/10 shadow-2xl animate-fade-in-down">
          <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full z-0" />
          
          <div className="relative z-10 flex items-center space-x-5">
            <div className="h-16 w-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-3xl border border-emerald-500/30 shadow-inner">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
                  Hello, {user.name}
                </h1>
                <span className="text-[11px] font-black text-emerald-400 border border-emerald-500/30 px-3 py-0.5 rounded-full uppercase tracking-widest bg-emerald-950/40">
                  {user.role}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                {user.role === 'admin' 
                  ? 'Administrator Clinical Portal: Monitor services schedule, assign caregivers, and track logistics.'
                  : 'Secure Patient Hub: Request appointments, track daily vitals, and order clinical equipment.'}
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-6 md:mt-0 flex items-center space-x-3 shrink-0">
            <button
              onClick={() => {
                if (user.role === 'admin') fetchAdminData();
                else fetchPatientData();
              }}
              className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold py-2.5 px-5 rounded-xl text-xs transition-all flex items-center space-x-2 cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Dashboard</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-3 border-b border-emerald-950/30 pb-3">
          {user.role === 'patient' ? (
            <>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-3 px-6 rounded-2xl text-sm font-bold transition-all duration-350 cursor-pointer ${
                  activeTab === 'bookings' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(52,211,153,0.25)] border border-emerald-400/20' 
                    : 'bg-emerald-950/20 text-slate-400 hover:text-emerald-300 border border-emerald-900/10 hover:border-emerald-800/30'
                }`}
              >
                📅 My Bookings
              </button>
              <button
                onClick={() => setActiveTab('vitals')}
                className={`py-3 px-6 rounded-2xl text-sm font-bold transition-all duration-350 cursor-pointer ${
                  activeTab === 'vitals' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(52,211,153,0.25)] border border-emerald-400/20' 
                    : 'bg-emerald-950/20 text-slate-400 hover:text-emerald-300 border border-emerald-900/10 hover:border-emerald-800/30'
                }`}
              >
                🩺 Daily Health Vitals
              </button>
              <button
                onClick={() => setActiveTab('equipment')}
                className={`py-3 px-6 rounded-2xl text-sm font-bold transition-all duration-350 cursor-pointer ${
                  activeTab === 'equipment' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(52,211,153,0.25)] border border-emerald-400/20' 
                    : 'bg-emerald-950/20 text-slate-400 hover:text-emerald-300 border border-emerald-900/10 hover:border-emerald-800/30'
                }`}
              >
                📦 Medical Equipment Orders
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('admin-bookings')}
                className={`py-3 px-6 rounded-2xl text-sm font-bold transition-all duration-350 cursor-pointer ${
                  activeTab === 'admin-bookings' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(52,211,153,0.25)] border border-emerald-400/20' 
                    : 'bg-emerald-950/20 text-slate-400 hover:text-emerald-300 border border-emerald-900/10 hover:border-emerald-800/30'
                }`}
              >
                📋 Booking Schedule Queue
              </button>
              <button
                onClick={() => setActiveTab('admin-equipment')}
                className={`py-3 px-6 rounded-2xl text-sm font-bold transition-all duration-350 cursor-pointer ${
                  activeTab === 'admin-equipment' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(52,211,153,0.25)] border border-emerald-400/20' 
                    : 'bg-emerald-950/20 text-slate-400 hover:text-emerald-300 border border-emerald-900/10 hover:border-emerald-800/30'
                }`}
              >
                🚚 Equipment Logistics Desk
              </button>
            </>
          )}
        </div>

        {/* Dashboard Content Panes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================== */}
          {/* TAB: PATIENT SERVICE BOOKINGS */}
          {/* ======================================================== */}
          {activeTab === 'bookings' && (
            <>
              {/* Left Column: Form to create new booking */}
              <div className="lg:col-span-5 glass-card-dark p-6 md:p-8 rounded-3xl border border-emerald-500/15 shadow-xl animate-fade-in-up">
                <h3 className="text-xl font-bold text-emerald-400 flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-emerald-400" />
                  <span>Book Home Care Service</span>
                </h3>
                <p className="text-xs text-slate-400 mt-2">Schedule clinic-quality home appointments.</p>

                {bookingSuccess && (
                  <div className="mt-5 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs leading-relaxed animate-scale-in">
                    {bookingSuccess}
                  </div>
                )}
                {bookingError && (
                  <div className="mt-5 p-4 bg-rose-950/40 border border-rose-500/30 rounded-2xl text-rose-300 text-xs leading-relaxed animate-scale-in">
                    {bookingError}
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="mt-6 flex flex-col space-y-4 text-left">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Service Category</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                    >
                      <option className="bg-[#0c1b18]">ICU at Home</option>
                      <option className="bg-[#0c1b18]">Home Nursing</option>
                      <option className="bg-[#0c1b18]">Physiotherapy</option>
                      <option className="bg-[#0c1b18]">Doctor Visit</option>
                      <option className="bg-[#0c1b18]">Trained Attendant</option>
                      <option className="bg-[#0c1b18]">Diagnostics</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Patient Name *</label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Patient Age *</label>
                      <input
                        type="number"
                        required
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        placeholder="Age"
                        className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Gender *</label>
                      <select
                        value={patientGender}
                        onChange={(e) => setPatientGender(e.target.value)}
                        className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                      >
                        <option className="bg-[#0c1b18]">Female</option>
                        <option className="bg-[#0c1b18]">Male</option>
                        <option className="bg-[#0c1b18]">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="10-digit Phone"
                        className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Start Date *</label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Time Slot *</label>
                      <select
                        value={preferredSlot}
                        onChange={(e) => setPreferredSlot(e.target.value)}
                        className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                      >
                        <option className="bg-[#0c1b18]">Morning (8 AM - 12 PM)</option>
                        <option className="bg-[#0c1b18]">Afternoon (12 PM - 4 PM)</option>
                        <option className="bg-[#0c1b18]">Evening (4 PM - 8 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Service Address *</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Building, Flat, Street"
                        className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Bangalore, Mumbai"
                      className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Additional Demands / Clinical Notes</label>
                    <textarea
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Special instructions (eg. post-cardiac rehab, oxygen support details)"
                      rows={3}
                      className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-2xl hover:shadow-[0_0_24px_rgba(52,211,153,0.35)] active:scale-98 transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer mt-2"
                  >
                    <span>Request Schedule Placement</span>
                  </button>
                </form>
              </div>

              {/* Right Column: History of bookings */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <div className="glass-card-dark p-6 md:p-8 rounded-3xl border border-emerald-500/10 shadow-xl text-left">
                  <h3 className="text-xl font-bold text-slate-200">Booking History Tracker</h3>
                  <p className="text-xs text-slate-400 mt-2">Logs of your clinical scheduling placements.</p>

                  <div className="mt-6 space-y-4">
                    {bookings.length === 0 ? (
                      <div className="p-10 text-center bg-emerald-950/10 rounded-2xl border border-emerald-950/20">
                        <Calendar className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                        <p className="text-sm text-slate-400 font-bold">No Bookings requested yet.</p>
                        <p className="text-xs text-slate-500 mt-1">Use the request form to create homecare logs.</p>
                      </div>
                    ) : (
                      bookings.map((b) => (
                        <div key={b._id} className="p-5 bg-emerald-950/10 border border-emerald-950/30 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-emerald-500/25 transition-all">
                          <div className="space-y-2 text-left">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="text-sm font-extrabold text-emerald-400 uppercase tracking-wider">{b.serviceType}</span>
                              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest ${
                                b.status === 'Pending' ? 'bg-amber-950/40 text-amber-400 border border-amber-800/20' :
                                b.status === 'Confirmed' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/20 animate-pulse' :
                                b.status === 'Completed' ? 'bg-indigo-950/40 text-indigo-400 border border-indigo-800/20' :
                                'bg-rose-950/40 text-rose-400 border border-rose-800/20'
                              }`}>
                                {b.status}
                              </span>
                            </div>

                            <p className="text-xs text-slate-300">
                              Patient: <strong className="text-slate-100">{b.patientName}</strong> ({b.patientAge}y, {b.patientGender})
                            </p>
                            <p className="text-xs text-slate-400">
                              📆 {new Date(b.preferredDate).toLocaleDateString()} • {b.preferredSlot}
                            </p>
                            <p className="text-xs text-slate-400 flex items-center space-x-1.5">
                              <MapPin className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                              <span>{b.address}, {b.city}</span>
                            </p>
                            
                            {/* Caregiver assigned block */}
                            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-xl text-xs font-semibold mt-1 ${
                              (!b.caregiverName || b.caregiverName === 'Not Assigned')
                                ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                                : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                            }`}>
                              <UserCheck className="h-3.5 w-3.5" />
                              <span>
                                Assigned Clinician: {(!b.caregiverName || b.caregiverName === 'Not Assigned') ? 'Review Pending' : b.caregiverName}
                              </span>
                            </div>
                          </div>

                          {b.status === 'Pending' && (
                            <button
                              onClick={() => handleCancelBooking(b._id)}
                              className="bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 border border-rose-900/30 hover:border-rose-800/50 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer self-stretch md:self-auto text-center"
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* TAB: PATIENT DAILY HEALTH VITALS LOGS */}
          {/* ======================================================== */}
          {activeTab === 'vitals' && (
            <>
              {/* Left Column: Form to log vitals */}
              <div className="lg:col-span-5 glass-card-dark p-6 md:p-8 rounded-3xl border border-emerald-500/15 shadow-xl animate-fade-in-up">
                <h3 className="text-xl font-bold text-emerald-400 flex items-center space-x-3">
                  <Activity className="h-6 w-6 text-emerald-400" />
                  <span>Log Patient Vitals</span>
                </h3>
                <p className="text-xs text-slate-400 mt-2">Upload daily telemetry safety parameters.</p>

                {vitalsSuccess && (
                  <div className="mt-5 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs leading-relaxed animate-scale-in">
                    {vitalsSuccess}
                  </div>
                )}
                {vitalsError && (
                  <div className="mt-5 p-4 bg-rose-950/40 border border-rose-500/30 rounded-2xl text-rose-300 text-xs leading-relaxed animate-scale-in">
                    {vitalsError}
                  </div>
                )}

                <form onSubmit={handleVitalsSubmit} className="mt-6 flex flex-col space-y-4 text-left">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">BP Systolic (mmHg)</label>
                      <input
                        type="number"
                        placeholder="eg 120"
                        value={bpSystolic}
                        onChange={(e) => setBpSystolic(e.target.value)}
                        className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">BP Diastolic (mmHg)</label>
                      <input
                        type="number"
                        placeholder="eg 80"
                        value={bpDiastolic}
                        onChange={(e) => setBpDiastolic(e.target.value)}
                        className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Sugar (mg/dL)</label>
                      <input
                        type="number"
                        placeholder="eg 100"
                        value={bloodSugar}
                        onChange={(e) => setBloodSugar(e.target.value)}
                        className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Heart Rate (BPM)</label>
                      <input
                        type="number"
                        placeholder="eg 72"
                        value={heartRate}
                        onChange={(e) => setHeartRate(e.target.value)}
                        className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">O2 Saturation (%)</label>
                      <input
                        type="number"
                        placeholder="eg 98"
                        value={oxygenLevel}
                        onChange={(e) => setOxygenLevel(e.target.value)}
                        className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Temperature (°F)</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="eg 98.6"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-2xl hover:shadow-[0_0_24px_rgba(52,211,153,0.35)] active:scale-98 transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer mt-2"
                  >
                    <span>Upload Telemetry Logs</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Trend tracker & historical alerts */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <div className="glass-card-dark p-6 md:p-8 rounded-3xl border border-emerald-500/10 shadow-xl text-left">
                  <h3 className="text-xl font-bold text-slate-200">Vital Telemetry Safety Streams</h3>
                  <p className="text-xs text-slate-400 mt-2">Historical lists with automatic clinical bounds auditing.</p>

                  <div className="mt-6 space-y-4">
                    {vitals.length === 0 ? (
                      <div className="p-10 text-center bg-emerald-950/10 rounded-2xl border border-emerald-950/20">
                        <Activity className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                        <p className="text-sm text-slate-400 font-bold">No vitals logged yet today.</p>
                        <p className="text-xs text-slate-500 mt-1">Use the telemetry panel to upload safety stats.</p>
                      </div>
                    ) : (
                      vitals.map((v) => {
                        const sugarWarn = getSugarWarning(v.bloodSugar);
                        const o2Warn = getOxygenWarning(v.oxygenLevel);
                        const bpWarn = getBPWarning(v.bloodPressureSystolic, v.bloodPressureDiastolic);

                        return (
                          <div key={v._id} className="p-5 bg-emerald-950/10 border border-emerald-950/30 rounded-2xl flex flex-col space-y-4 hover:border-emerald-500/25 transition-all text-left">
                            <div className="flex flex-wrap justify-between items-center gap-2 border-b border-emerald-900/20 pb-3">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                RECORDED ON: {new Date(v.recordedAt).toLocaleString()}
                              </span>
                              
                              <div className="flex flex-wrap gap-2">
                                {sugarWarn && (
                                  <span className={`text-[9px] font-black px-2.5 py-0.5 rounded border uppercase tracking-wider ${sugarWarn.color}`}>
                                    {sugarWarn.label}
                                  </span>
                                )}
                                {o2Warn && (
                                  <span className={`text-[9px] font-black px-2.5 py-0.5 rounded border uppercase tracking-wider ${o2Warn.color}`}>
                                    {o2Warn.label}
                                  </span>
                                )}
                                {bpWarn && (
                                  <span className={`text-[9px] font-black px-2.5 py-0.5 rounded border uppercase tracking-wider ${bpWarn.color}`}>
                                    {bpWarn.label}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Vitals Telemetry Box */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                              {v.bloodPressureSystolic && (
                                <div className="bg-emerald-950/20 p-3 rounded-2xl border border-emerald-900/10">
                                  <span className="text-[9px] uppercase tracking-widest text-slate-400 block font-bold">BP Systolic</span>
                                  <span className="text-base font-extrabold text-slate-200 mt-1 block">
                                    {v.bloodPressureSystolic} <span className="text-[9px] font-normal text-slate-400">mmHg</span>
                                  </span>
                                </div>
                              )}
                              {v.bloodPressureDiastolic && (
                                <div className="bg-emerald-950/20 p-3 rounded-2xl border border-emerald-900/10">
                                  <span className="text-[9px] uppercase tracking-widest text-slate-400 block font-bold">BP Diastolic</span>
                                  <span className="text-base font-extrabold text-slate-200 mt-1 block">
                                    {v.bloodPressureDiastolic} <span className="text-[9px] font-normal text-slate-400">mmHg</span>
                                  </span>
                                </div>
                              )}
                              {v.bloodSugar && (
                                <div className="bg-emerald-950/20 p-3 rounded-2xl border border-emerald-900/10">
                                  <span className="text-[9px] uppercase tracking-widest text-slate-400 block font-bold">Sugar Level</span>
                                  <span className="text-base font-extrabold text-slate-200 mt-1 block">
                                    {v.bloodSugar} <span className="text-[9px] font-normal text-slate-400">mg/dL</span>
                                  </span>
                                </div>
                              )}
                              {v.heartRate && (
                                <div className="bg-emerald-950/20 p-3 rounded-2xl border border-emerald-900/10">
                                  <span className="text-[9px] uppercase tracking-widest text-slate-400 block font-bold">Pulse Rate</span>
                                  <span className="text-base font-extrabold text-slate-200 mt-1 block">
                                    {v.heartRate} <span className="text-[9px] font-normal text-slate-400">BPM</span>
                                  </span>
                                </div>
                              )}
                              {v.oxygenLevel && (
                                <div className="bg-emerald-950/20 p-3 rounded-2xl border border-emerald-900/10">
                                  <span className="text-[9px] uppercase tracking-widest text-slate-400 block font-bold">SpO2 (O2)</span>
                                  <span className="text-base font-extrabold text-slate-200 mt-1 block">
                                    {v.oxygenLevel} <span className="text-[9px] font-normal text-slate-400">%</span>
                                  </span>
                                </div>
                              )}
                              {v.temperature && (
                                <div className="bg-emerald-950/20 p-3 rounded-2xl border border-emerald-900/10">
                                  <span className="text-[9px] uppercase tracking-widest text-slate-400 block font-bold">Temperature</span>
                                  <span className="text-base font-extrabold text-slate-200 mt-1 block">
                                    {v.temperature} <span className="text-[9px] font-normal text-slate-400">°F</span>
                                  </span>
                                </div>
                              )}
                            </div>

                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* TAB: PATIENT MEDICAL EQUIPMENT ORDERS */}
          {/* ======================================================== */}
          {activeTab === 'equipment' && (
            <>
              {/* Left Column: Form to place order */}
              <div className="lg:col-span-5 glass-card-dark p-6 md:p-8 rounded-3xl border border-emerald-500/15 shadow-xl animate-fade-in-up">
                <h3 className="text-xl font-bold text-emerald-400 flex items-center space-x-3">
                  <Truck className="h-6 w-6 text-emerald-400" />
                  <span>Request Clinical Equipment</span>
                </h3>
                <p className="text-xs text-slate-400 mt-2">Book certified oxygen monitors or critical motorized beds.</p>

                {eqSuccess && (
                  <div className="mt-5 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs leading-relaxed animate-scale-in">
                    {eqSuccess}
                  </div>
                )}
                {eqError && (
                  <div className="mt-5 p-4 bg-rose-950/40 border border-rose-500/30 rounded-2xl text-rose-300 text-xs leading-relaxed animate-scale-in">
                    {eqError}
                  </div>
                )}

                <form onSubmit={handleEquipmentSubmit} className="mt-6 flex flex-col space-y-4 text-left">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Equipment Model</label>
                    <select
                      value={eqName}
                      onChange={(e) => setEqName(e.target.value)}
                      className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                    >
                      <option className="bg-[#0c1b18]">Oxygen Concentrator 5L</option>
                      <option className="bg-[#0c1b18]">Oxygen Concentrator 10L</option>
                      <option className="bg-[#0c1b18]">Oxygen Cylinder</option>
                      <option className="bg-[#0c1b18]">BiPAP Machine</option>
                      <option className="bg-[#0c1b18]">CPAP Machine</option>
                      <option className="bg-[#0c1b18]">Portable Ventilator</option>
                      <option className="bg-[#0c1b18]">Suction Machine</option>
                      <option className="bg-[#0c1b18]">ICU Motorized Patient Bed</option>
                      <option className="bg-[#0c1b18]">Manual Medical Bed</option>
                      <option className="bg-[#0c1b18]">Air Mattress (Anti-Decubitus)</option>
                      <option className="bg-[#0c1b18]">Foldable Wheelchair</option>
                      <option className="bg-[#0c1b18]">Motorized Wheelchair</option>
                      <option className="bg-[#0c1b18]">Commode Chair</option>
                      <option className="bg-[#0c1b18]">Patient Monitor (Multi-Para)</option>
                      <option className="bg-[#0c1b18]">Pulse Oximeter (Tabletop)</option>
                      <option className="bg-[#0c1b18]">Syringe Pump</option>
                      <option className="bg-[#0c1b18]">Infusion Pump</option>
                      <option className="bg-[#0c1b18]">DVT Pump</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Booking Model</label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <button
                        type="button"
                        onClick={() => setEqType('Rent')}
                        className={`py-3 px-4 rounded-2xl border text-sm font-bold transition-all cursor-pointer ${
                          eqType === 'Rent' 
                            ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300' 
                            : 'border-emerald-900/20 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        Rent Support
                      </button>
                      <button
                        type="button"
                        onClick={() => setEqType('Buy')}
                        className={`py-3 px-4 rounded-2xl border text-sm font-bold transition-all cursor-pointer ${
                          eqType === 'Buy' 
                            ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300' 
                            : 'border-emerald-900/20 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        Purchase Support
                      </button>
                    </div>
                  </div>

                  {eqType === 'Rent' && (
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Rental Duration (Weeks)</label>
                      <input
                        type="number"
                        min="1"
                        value={eqDuration}
                        onChange={(e) => setEqDuration(e.target.value)}
                        className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Delivery Address *</label>
                    <input
                      type="text"
                      required
                      value={eqAddress}
                      onChange={(e) => setEqAddress(e.target.value)}
                      placeholder="Delivery site full address"
                      className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={eqPhone}
                      onChange={(e) => setEqPhone(e.target.value)}
                      placeholder="10-digit Phone"
                      className="w-full mt-2 glass-input text-slate-200 text-sm px-4 py-3 rounded-2xl focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-2xl hover:shadow-[0_0_24px_rgba(52,211,153,0.35)] active:scale-98 transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer mt-2"
                  >
                    <span>Request Logistics Setup</span>
                  </button>
                </form>
              </div>

              {/* Right Column: List of orders */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <div className="glass-card-dark p-6 md:p-8 rounded-3xl border border-emerald-500/10 shadow-xl text-left">
                  <h3 className="text-xl font-bold text-slate-200">Logistics Dispatch History</h3>
                  <p className="text-xs text-slate-400 mt-2">Review active clinical medical machinery leases.</p>

                  <div className="mt-6 space-y-4">
                    {equipmentOrders.length === 0 ? (
                      <div className="p-10 text-center bg-emerald-950/10 rounded-2xl border border-emerald-950/20">
                        <Truck className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                        <p className="text-sm text-slate-400 font-bold">No equipment request orders created.</p>
                        <p className="text-xs text-slate-500 mt-1">Use the hiring board to request logistics dispatch.</p>
                      </div>
                    ) : (
                      equipmentOrders.map((ord) => (
                        <div key={ord._id} className="p-5 bg-emerald-950/10 border border-emerald-950/30 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-extrabold text-slate-200">{ord.equipmentName}</span>
                              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                ord.bookingType === 'Rent' ? 'bg-emerald-950/40 text-emerald-400' : 'bg-teal-950/40 text-teal-400'
                              }`}>
                                {ord.bookingType} {ord.bookingType === 'Rent' && `(${ord.durationWeeks} wk)`}
                              </span>
                            </div>

                            <p className="text-xs text-slate-400">
                              Order Status: <strong className="text-emerald-400 uppercase tracking-widest text-[10px]">{ord.status}</strong>
                            </p>
                            <p className="text-xs text-slate-400">
                              📍 Delivered To: {ord.deliveryAddress}
                            </p>
                          </div>

                          {/* Pricing is completely removed */}
                          <div className="text-left sm:text-right border border-emerald-500/10 bg-emerald-500/5 px-3.5 py-1.5 rounded-xl">
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Lease Mode</span>
                            <span className="text-xs font-bold text-emerald-400">Active Pipeline</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* TAB: ADMIN SERVICES SCHEDULE QUEUE */}
          {/* ======================================================== */}
          {activeTab === 'admin-bookings' && user.role === 'admin' && (
            <div className="lg:col-span-12 glass-card-dark p-6 md:p-8 rounded-3xl border border-emerald-500/15 shadow-xl text-left animate-scale-in">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-emerald-900/20 pb-5 mb-6 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-emerald-400">Clinical Homecare Queue</h3>
                  <p className="text-xs text-slate-400 mt-2">Review pending customer requests, assign staff, and update statuses.</p>
                </div>
                <div className="bg-emerald-950/40 border border-emerald-900/30 rounded-2xl px-5 py-3 font-bold text-xs text-emerald-300">
                  Total System Bookings: {adminBookings.length}
                </div>
              </div>

              <div className="space-y-4">
                {adminBookings.length === 0 ? (
                  <div className="p-10 text-center bg-emerald-950/10 rounded-2xl border border-emerald-950/20">
                    <ClipboardList className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                    <p className="text-sm text-slate-400 font-bold">No medical appointments requested yet by users.</p>
                  </div>
                ) : (
                  adminBookings.map((b) => (
                    <div key={b._id} className="p-5 bg-emerald-950/10 border border-emerald-950/30 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      
                      <div className="space-y-2.5 text-left flex-grow">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-base font-extrabold text-slate-100 uppercase tracking-wide">{b.serviceType}</span>
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            b.status === 'Pending' ? 'bg-amber-950/40 text-amber-400 border border-amber-800/20' :
                            b.status === 'Confirmed' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/20' :
                            b.status === 'Completed' ? 'bg-indigo-950/40 text-indigo-400 border border-indigo-800/20' :
                            'bg-rose-950/40 text-rose-400 border border-rose-800/20'
                          }`}>
                            {b.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300">
                          Patient: <strong className="text-slate-100">{b.patientName}</strong> ({b.patientAge}y, {b.patientGender}) • Mobile: <strong className="text-slate-100">{b.contactNumber}</strong>
                        </p>
                        
                        <p className="text-xs text-slate-400">
                          📍 Address: {b.address}, {b.city}
                        </p>

                        <p className="text-xs text-slate-400">
                          📆 Preferred Appointment: {new Date(b.preferredDate).toLocaleDateString()} at {b.preferredSlot}
                        </p>

                        {b.additionalNotes && (
                          <p className="text-xs text-slate-400 bg-emerald-950/20 border border-emerald-900/10 p-3 rounded-2xl italic leading-relaxed">
                            Patient Note: "{b.additionalNotes}"
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Assign Clinician:</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="e.g. Dr. Rakesh Nair"
                              value={assignCaregiver[b._id] !== undefined ? assignCaregiver[b._id] : (b.caregiverName === 'Not Assigned' ? '' : (b.caregiverName || ''))}
                              onChange={(e) => setAssignCaregiver({
                                ...assignCaregiver,
                                [b._id]: e.target.value
                              })}
                              className="glass-input px-3.5 py-1.5 rounded-xl text-xs focus:outline-emerald-500 font-semibold"
                            />
                            <button
                              onClick={() => handleUpdateCaregiverOnly(b._id)}
                              className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer shadow-sm hover:shadow-[0_0_10px_rgba(16,185,129,0.15)] active:scale-95"
                            >
                              Save Assignment
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Action Triggers */}
                      <div className="flex flex-col sm:flex-row gap-3.5 self-stretch md:self-auto justify-end shrink-0">
                        {b.status === 'Pending' && (
                          <button
                            onClick={() => handleAdminUpdateBooking(b._id, 'Pending')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Confirm Booking</span>
                          </button>
                        )}
                        {b.status === 'Confirmed' && (
                          <button
                            onClick={() => handleAdminUpdateBooking(b._id, 'Confirmed')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_12px_rgba(79,70,229,0.2)]"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Mark Completed</span>
                          </button>
                        )}
                        {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                          <button
                            onClick={() => handleAdminCancelBooking(b._id)}
                            className="bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 border border-rose-900/30 font-bold py-2.5 px-5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
                          >
                            <XCircle className="h-4 w-4" />
                            <span>Reject</span>
                          </button>
                        )}
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: ADMIN EQUIPMENT LOGISTICS MANAGER */}
          {/* ======================================================== */}
          {activeTab === 'admin-equipment' && user.role === 'admin' && (
            <div className="lg:col-span-12 glass-card-dark p-6 md:p-8 rounded-3xl border border-emerald-500/15 shadow-xl text-left animate-scale-in">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-emerald-900/20 pb-5 mb-6 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-emerald-400">Medical Machinery Logistics Board</h3>
                  <p className="text-xs text-slate-400 mt-2">Review active lease or purchasing logistics order requests.</p>
                </div>
              </div>

              <div className="space-y-4">
                {adminEquipment.length === 0 ? (
                  <div className="p-10 text-center bg-emerald-950/10 rounded-2xl border border-emerald-950/20">
                    <Truck className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                    <p className="text-sm text-slate-400 font-bold">No active equipment logistics bookings yet.</p>
                  </div>
                ) : (
                  adminEquipment.map((ord) => (
                    <div key={ord._id} className="p-5 bg-emerald-950/10 border border-emerald-950/30 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      
                      <div className="space-y-2 text-left flex-grow">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-base font-extrabold text-slate-100">{ord.equipmentName}</span>
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            ord.bookingType === 'Rent' ? 'bg-emerald-950/40 text-emerald-400' : 'bg-teal-950/40 text-teal-400'
                          }`}>
                            {ord.bookingType} {ord.bookingType === 'Rent' && `(${ord.durationWeeks} Weeks)`}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-black border border-emerald-500/20 bg-emerald-950/20 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                            Status: {ord.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300">
                          Client: <strong>{ord.user ? ord.user.name : 'Sample User'}</strong> ({ord.user ? ord.user.email : ''}) • Mobile: <strong>{ord.contactNumber}</strong>
                        </p>
                        
                        <p className="text-xs text-slate-400">
                          📍 Delivery Site Address: {ord.deliveryAddress}
                        </p>

                        {/* Pricing details removed */}
                      </div>

                      {/* Status switches */}
                      <div className="flex flex-wrap gap-2.5 shrink-0">
                        {ord.status === 'Pending' && (
                          <button
                            onClick={() => handleAdminUpdateEquipment(ord._id, 'Delivered')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-colors cursor-pointer"
                          >
                            Mark Delivered
                          </button>
                        )}
                        {ord.status === 'Delivered' && (
                          <button
                            onClick={() => handleAdminUpdateEquipment(ord._id, 'Returned')}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-colors cursor-pointer"
                          >
                            Mark Returned
                          </button>
                        )}
                        {ord.status !== 'Cancelled' && ord.status !== 'Returned' && (
                          <button
                            onClick={() => handleAdminUpdateEquipment(ord._id, 'Cancelled')}
                            className="bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 border border-rose-900/30 font-bold py-2.5 px-5 rounded-xl text-xs transition-colors cursor-pointer"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
