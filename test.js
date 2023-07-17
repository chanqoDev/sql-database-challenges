const mysql = require("mysql2");
const config = require('./config');

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
  console.log('MySQL Connected..');
});

const query = 'SELECT * FROM Products';


db.query(query, (err, results) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Result:');
    console.log(results);
  }
});

db.end();
