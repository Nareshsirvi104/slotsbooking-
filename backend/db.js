const mysql = require("mysql2");

const db = mysql.createConnection({
  host: 'localhost',
  user: 'booking_user',
  password: 'booking123',
  database: 'booking_app'
});

db.connect(err => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("✅ MySQL Connected");
});

module.exports = db;
