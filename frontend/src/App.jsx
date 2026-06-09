import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Diagnostics from './pages/Diagnostics';
import Equipment from './pages/Equipment';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FloatingContact from './components/FloatingContact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen relative" style={{ background: '#060d0c' }}>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/"           element={<Home />}        />
              <Route path="/services"   element={<Services />}    />
              <Route path="/diagnostics"element={<Diagnostics />} />
              <Route path="/equipment"  element={<Equipment />}   />
              <Route path="/about"      element={<About />}       />
              <Route path="/login"      element={<Login />}       />
              <Route path="/register"   element={<Register />}    />
              <Route path="/dashboard"  element={<Dashboard />}   />
            </Routes>
          </main>
          <Footer />
          <FloatingContact />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
