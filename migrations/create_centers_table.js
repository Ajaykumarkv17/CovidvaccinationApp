// migrations/create_centers_table.js

const db = require('../config/database');

db.query(
  `CREATE TABLE IF NOT EXISTS centers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    working_hours VARCHAR(255) NOT NULL,
    slots_available INT NOT NULL
  )`,
  (error) => {
    if (error) {
      console.error('Error creating centers table:', error);
    } else {
      console.log('Centers table created');
    }
  }
);
