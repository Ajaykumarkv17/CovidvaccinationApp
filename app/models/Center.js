// app/models/Center.js

const db = require('../../config/database');

class Center {
  static findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM centers WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  static findByLocation(location) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM centers WHERE location LIKE ?', [`%${location}%`], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static decreaseSlots(centerId) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE centers SET slots_available = slots_available - 1 WHERE id = ?', [centerId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows);
        }
      });
    });
  }
}

module.exports = Center;
