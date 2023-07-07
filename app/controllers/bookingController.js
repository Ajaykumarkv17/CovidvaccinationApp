// app/controllers/bookingController.js

const Booking = require('../models/Booking');
const Center = require('../models/Center');
exports.renderApplyForm = (req, res) => {
    res.render('booking/apply');
  };
exports.applyForSlot = async (req, res) => {
  const { userId, centerId, bookingDate } = req.body;

  try {
    // Check if there are enough available slots
    const center = await Center.findById(centerId);
    if (center.slots_available <= 0) {
      // Handle the case when no slots are available
      return res.render('booking/error', { message: 'No slots available' });
    }

    // Create a booking
    const bookingId = await Booking.createBooking(userId, centerId, bookingDate);

    // Decrease the available slots count
    const slotsUpdated = await Center.decreaseSlots(centerId);
    if (slotsUpdated !== 1) {
      // Handle the case when the slots couldn't be decreased
      return res.render('booking/error', { message: 'Failed to update slots' });
    }

    // Render the confirmation page
    res.render('booking/confirmation', { bookingId });
  } catch (error) {
    // Handle any errors
    console.error('Error applying for slot:', error);
    res.render('booking/error', { message: 'An error occurred' });
  }
};

