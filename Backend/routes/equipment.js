const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');
const { protect, authorize } = require('../middleware/auth');

// @desc    Submit an equipment request (Rent or Buy)
// @route   POST /api/equipment
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { equipmentName, bookingType, durationWeeks, deliveryAddress, contactNumber } = req.body;

    // Standardized prices for demonstration
    const priceList = {
      'Oxygen Concentrator 5L': { rent: 2000, buy: 35000 },
      'Oxygen Concentrator 10L': { rent: 4000, buy: 70000 },
      'Oxygen Cylinder': { rent: 1000, buy: 12000 },
      'BiPAP Machine': { rent: 4000, buy: 60000 },
      'CPAP Machine': { rent: 3000, buy: 40000 },
      'Portable Ventilator': { rent: 15000, buy: 250000 },
      'Suction Machine': { rent: 1200, buy: 15000 },
      'ICU Motorized Patient Bed': { rent: 5000, buy: 85000 },
      'Manual Medical Bed': { rent: 2500, buy: 35000 },
      'Air Mattress (Anti-Decubitus)': { rent: 800, buy: 5000 },
      'Foldable Wheelchair': { rent: 800, buy: 8500 },
      'Motorized Wheelchair': { rent: 4000, buy: 75000 },
      'Commode Chair': { rent: 500, buy: 4000 },
      'Patient Monitor (Multi-Para)': { rent: 3000, buy: 45000 },
      'Pulse Oximeter (Tabletop)': { rent: 1000, buy: 12000 },
      'Syringe Pump': { rent: 2500, buy: 35000 },
      'Infusion Pump': { rent: 2500, buy: 35000 },
      'DVT Pump': { rent: 2000, buy: 25000 }
    };

    const rate = priceList[equipmentName];
    if (!rate) {
      return res.status(400).json({ success: false, message: 'Invalid medical equipment selected' });
    }

    let calculatedPrice = 0;
    if (bookingType === 'Rent') {
      calculatedPrice = rate.rent * (durationWeeks || 1);
    } else {
      calculatedPrice = rate.buy;
    }

    const order = await Equipment.create({
      user: req.user.id,
      equipmentName,
      bookingType,
      durationWeeks: bookingType === 'Rent' ? (durationWeeks || 1) : undefined,
      deliveryAddress,
      contactNumber,
      totalPrice: calculatedPrice
    });

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Create Equipment Request Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get equipment requests
// @route   GET /api/equipment
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let orders;

    if (req.user.role === 'admin') {
      orders = await Equipment.find().populate('user', 'name email').sort('-createdAt');
    } else {
      orders = await Equipment.find({ user: req.user.id }).sort('-createdAt');
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Fetch Equipment Orders Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update order status
// @route   PUT /api/equipment/:id
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const order = await Equipment.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Equipment order not found' });
    }

    if (req.body.status) {
      order.status = req.body.status;
    }

    await order.save();

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Update Equipment Status Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
