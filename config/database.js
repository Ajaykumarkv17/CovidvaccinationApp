
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'flightdb2.cjzejrsuaply.eu-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'ajay2003',
    database: 'covidapp',
});

db.getConnection((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database');
  }
});
module.exports=db;