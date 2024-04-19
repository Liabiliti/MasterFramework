const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "authentication",
  port: 3306
});

// Establish a connection to the MySQL database
db.connect(err => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;