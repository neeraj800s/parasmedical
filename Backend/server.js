const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const vitalsRoutes = require('./routes/vitals');
const equipmentRoutes = require('./routes/equipment');

const app = express();

// Middleware for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://parasmedical-mrfeg92a2-neeraj800s-projects.vercel.app',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);

    // If origin is in allowed list, allow it
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    // Fallback: If not production or FRONTEND_URL is not set, allow all to prevent breaking local dev
    if (process.env.NODE_ENV !== 'production' || !process.env.FRONTEND_URL) {
      return callback(null, true);
    }

    const msg = 'The CORS policy for this site does not allow access from origin: ' + origin;
    return callback(new Error(msg), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI;
console.log('Connecting to MongoDB at:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connection established successfully!');
    try {
      const adminEmail = 'parasmedicalstore86@gmail.com';
      const User = require('./models/User');
      await User.deleteOne({ email: adminEmail });
      await User.create({
        name: 'Paras Admin',
        email: adminEmail,
        password: 'paras@123',
        role: 'admin'
      });
      console.log('Admin user seeded successfully with parasmedicalstore86@gmail.com');

      // Convert any other admins to patient role
      const otherAdmins = await User.find({ role: 'admin', email: { $ne: adminEmail } });
      for (const u of otherAdmins) {
        u.role = 'patient';
        await u.save();
      }
      if (otherAdmins.length > 0) {
        console.log(`Demoted ${otherAdmins.length} other admin accounts to patient role.`);
      }
    } catch (err) {
      console.error('Error seeding admin user:', err.message);
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.log('Please ensure your MongoDB service is running (mongod) or configure MONGODB_URI in a .env file.');
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/vitals', vitalsRoutes);
app.use('/api/equipment', equipmentRoutes);

// Base route for API health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Welcome to AuraCare Home Health secure API server'
  });
});

// Custom Error Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
