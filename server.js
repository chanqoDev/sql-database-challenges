const http = require("http");
const express = require("express");
const app = express();
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
  CREATE TABLE IF NOT EXISTS Customer (
    id int, name varchar(25), referee_id int
  )
`;

const truncateTableQuery = `TRUNCATE TABLE Customer`;

const insertDataQuery = `
INSERT INTO Customer (id, name, referee_id)
VALUES
    ('1', 'Will', NULL),
    ('2', 'Jane', NULL),
    ('3', 'Alex', '2'),
    ('4', 'Bill', NULL),
    ('5', 'Zack', '1'),
    ('6', 'Mark', '2');
`

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
