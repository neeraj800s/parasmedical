const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  equipmentName: {
    type: String,
    required: [true, 'Please select equipment name'],
    enum: [
      'Oxygen Concentrator 5L',
      'Oxygen Concentrator 10L',
      'Oxygen Cylinder',
      'BiPAP Machine',
      'CPAP Machine',
      'Portable Ventilator',
      'Suction Machine',
      'ICU Motorized Patient Bed',
      'Manual Medical Bed',
      'Air Mattress (Anti-Decubitus)',
      'Foldable Wheelchair',
      'Motorized Wheelchair',
      'Reclining Wheelchair',
      'Adjustable Walker',
      'Commode Chair',
      'Patient Monitor (Multi-Para)',
      'Pulse Oximeter (Tabletop)',
      'Syringe Pump',
      'Infusion Pump',
      'Enteral Feeding Pump',
      'DVT Pump',
      'Nebulizer Machine',
      'Hydraulic Patient Lifter'
    ]
  },
  bookingType: {
    type: String,
    required: true,
    enum: ['Rent', 'Buy']
  },
  durationWeeks: {
    type: Number,
    required: function() { return this.bookingType === 'Rent'; },
    default: 1
  },
  deliveryAddress: {
    type: String,
    required: [true, 'Please add a delivery address']
  },
  contactNumber: {
    type: String,
    required: [true, 'Please add a contact number']
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Delivered', 'Returned', 'Cancelled'],
    default: 'Pending'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
