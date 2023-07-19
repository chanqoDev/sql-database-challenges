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
const createTableQuery = `CREATE TABLE IF NOT EXISTS World ( name varchar(255), continent varchar(255), area int, population int, gdp bigint)`;

const truncateTableQuery = `TRUNCATE TABLE World`;

const insertDataQuery = `
INSERT INTO World (name, continent, area, population, gdp)
VALUES
    ('Afghanistan', 'Asia', '652230', '25500100', '20343000000'),
    ('Albania', 'Europe', '28748', '2831741', '12960000000'),
('Algeria', 'Africa', '2381741', '37100000', '188681000000'),
    ('Andorra', 'Europe', '468', '78115', '3712000000'),
    ('Angola', 'Africa', '1246700', '20609294', '100990000000');
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
