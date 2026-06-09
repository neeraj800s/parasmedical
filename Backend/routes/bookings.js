const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect, authorize } = require('../middleware/auth');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private (Patient/Admin)
router.post('/', protect, async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      user: req.user.id
    };

    const booking = await Booking.create(bookingData);

    res.status(201).json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Create Booking Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get all bookings (Admin sees all, Patient sees only their own)
// @route   GET /api/bookings
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let bookings;

    if (req.user.role === 'admin') {
      // Admin sees all and populates patient details
      bookings = await Booking.find().populate('user', 'name email').sort('-createdAt');
    } else {
      // Patients only see their own
      bookings = await Booking.find({ user: req.user.id }).sort('-createdAt');
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Fetch Bookings Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update a booking status/assignment (Admin has full control, User can only cancel)
// @route   PUT /api/bookings/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let booking = await Booking.findById(req.id || req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check if the user is the owner of the booking OR is an admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to update this booking' });
    }

    // If non-admin user is trying to update
    if (req.user.role !== 'admin') {
      // Patients are only allowed to change status to 'Cancelled'
      if (req.body.status && req.body.status === 'Cancelled') {
        booking.status = 'Cancelled';
      } else {
        return res.status(400).json({ success: false, message: 'Patients can only cancel bookings, admin modifications required for other details' });
      }
    } else {
      // Admins can update any field (status, caregiver assigned, notes, etc.)
      const allowedUpdates = [
        'status',
        'caregiverName',
        'patientName',
        'patientAge',
        'patientGender',
        'contactNumber',
        'address',
        'city',
        'preferredDate',
        'preferredSlot',
        'additionalNotes'
      ];

      allowedUpdates.forEach((field) => {
        if (req.body[field] !== undefined) {
          booking[field] = req.body[field];
        }
      });
    }

    await booking.save();

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Update Booking Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Delete Booking Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
