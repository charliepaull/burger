// set up mySQL connection

// first have to require SQL
var mysql = require("mysql");

//creating a mysql connection to a PORT (not actually connecting yet)
var connection = mysql.createConnection({
    host: "localhost",
    port: 3300,
    user: "root",
    password: "password",
    database: "burgers_db"
  });

// Make the actual connection
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
  
  // Export connection for our ORM to use.
  module.exports = connection;
  