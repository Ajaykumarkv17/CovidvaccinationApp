// seeders/user_seeder.js

const db = require('../config/database');
const bcrypt = require('bcrypt');

const username = 'admin';
const email = 'admin@example.com';
const password = 'admin123';

bcrypt.hash(password, 10, (error, hashedPassword) => {
  if (error) {
    console.error('Error hashing password:', error);
  } else {
  db.query(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, hashedPassword],
    (error) => {
      if (error) {
        console.error('Error seeding user:', error);
      } else {
        console.log('User seeded');
      }
    }
  );
}});
