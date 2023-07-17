const http = require("http");
const express = require("express");
const app = express();
// const mysql = require("mysql");
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const config = require("./config");
const PORT = 3001;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/test", (req, res) => {
  res.send("new update ");
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// Create connection : add the configuration object and setup config's
const db = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,

});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql Connected..");
});
 
// Create table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS Products (
    product_id INT,
    low_fats ENUM('Y', 'N'),
    recyclable ENUM('Y','N')
  )
`;

const truncateTableQuery = `TRUNCATE TABLE Products`;

const insertDataQuery = `
  INSERT INTO Products (product_id, low_fats, recyclable)
  VALUES
    ('0', 'Y', 'N'),
    ('1', 'Y', 'Y'),
    ('2', 'N', 'Y'),
    ('3', 'Y', 'Y'),
    ('4', 'N', 'N')
`;

// Execute queries
db.query(createTableQuery, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Table created");
    // Once the table is created, truncate the table and insert data
    db.query(truncateTableQuery, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Table truncated");
        db.query(insertDataQuery, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Data inserted");
          }
        });
      }
    });
  }
});
