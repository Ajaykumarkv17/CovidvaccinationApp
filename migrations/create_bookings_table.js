// migrations/create_bookings_table.js

const db = require('../config/database');

db.query(
  `CREATE TABLE IF NOT EXISTS bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    center_id INT NOT NULL,
    booking_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (center_id) REFERENCES centers(id)
  )`,
  (error) => {
    if (error) {
      console.error('Error creating bookings table:', error);
    } else {
      console.log('Bookings table created');
    }
  }
);
