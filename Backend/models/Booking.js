const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceType: {
    type: String,
    required: [true, 'Please select a service type'],
    enum: [
      'ICU at Home',
      'Home Nursing',
      'Physiotherapy',
      'Doctor Visit',
      'Trained Attendant',
      'Diagnostics'
    ]
  },
  patientName: {
    type: String,
    required: [true, 'Please add the patient name']
  },
  patientAge: {
    type: Number,
    required: [true, 'Please add the patient age']
  },
  patientGender: {
    type: String,
    required: [true, 'Please select the patient gender'],
    enum: ['Male', 'Female', 'Other']
  },
  contactNumber: {
    type: String,
    required: [true, 'Please add a contact number']
  },
  address: {
    type: String,
    required: [true, 'Please add a service delivery address']
  },
  city: {
    type: String,
    required: [true, 'Please specify the city']
  },
  preferredDate: {
    type: Date,
    required: [true, 'Please specify a preferred start date']
  },
  preferredSlot: {
    type: String,
    required: [true, 'Please specify a time slot'],
    enum: ['Morning (8 AM - 12 PM)', 'Afternoon (12 PM - 4 PM)', 'Evening (4 PM - 8 PM)']
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  caregiverName: {
    type: String,
    default: 'Not Assigned'
  },
  additionalNotes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
