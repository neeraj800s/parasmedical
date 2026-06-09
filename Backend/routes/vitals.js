const express = require('express');
const router = express.Router();
const Vitals = require('../models/Vitals');
const { protect } = require('../middleware/auth');

// @desc    Record new vitals
// @route   POST /api/vitals
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const vitalsData = {
      ...req.body,
      user: req.user.id
    };

    const vitals = await Vitals.create(vitalsData);

    res.status(201).json({
      success: true,
      vitals
    });
  } catch (error) {
    console.error('Log Vitals Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get vitals history
// @route   GET /api/vitals
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let vitals;

    if (req.user.role === 'admin' && req.query.userId) {
      // Admin tracking a specific patient
      vitals = await Vitals.find({ user: req.query.userId }).sort('-recordedAt');
    } else {
      // Patient tracking their own
      vitals = await Vitals.find({ user: req.user.id }).sort('-recordedAt');
    }

    res.status(200).json({
      success: true,
      count: vitals.length,
      vitals
    });
  } catch (error) {
    console.error('Fetch Vitals Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
