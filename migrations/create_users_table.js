// migrations/create_users_table.js

const db = require('../config/database');

db.query(
  `CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )`,
  (error) => {
    if (error) {
      console.error('Error creating users table:', error);
    } else {
      console.log('Users table created');
    }
  }
);
