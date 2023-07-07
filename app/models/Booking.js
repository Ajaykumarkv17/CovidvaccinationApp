// app/models/Booking.js

const db = require('../../config/database');

class Booking {
  static createBooking(userId, centerId, bookingDate) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO bookings (user_id, center_id, booking_date) VALUES (?, ?, ?)',
        [userId, centerId, bookingDate],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.insertId);
          }
        }
      );
    });
  }
}

module.exports = Booking;
