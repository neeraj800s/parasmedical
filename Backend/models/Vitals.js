const mongoose = require('mongoose');

const VitalsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodPressureSystolic: {
    type: Number,
    required: false
  },
  bloodPressureDiastolic: {
    type: Number,
    required: false
  },
  bloodSugar: {
    type: Number,
    required: false // in mg/dL
  },
  heartRate: {
    type: Number,
    required: false // in bpm
  },
  oxygenLevel: {
    type: Number,
    required: false // in SpO2 %
  },
  temperature: {
    type: Number,
    required: false // in °F
  },
  recordedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vitals', VitalsSchema);
