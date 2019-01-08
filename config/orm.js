/* create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

     * `selectAll()`
     * `insertBurger()`
     * `consumeBurger()`

   * Export the ORM object in `module.exports`.*/


var connection = require("../config/connection.js");

// ORM helps create query methods
// The last variable cb represents the anonymous function being passed from server.js

// The below helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Bacon Cheeseburger => 'Bacon Cheeseburger')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Bacon Cheeseburger'} => ["name='Bacon Cheeseburger'"]
      // e.g. {consumed: true} => ["consumed=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
};

var orm = {
  // ORM method to select everything from the table
  all: function(tblInput, cb){
    // set-up of SQL table query - what am I looking for within database?
    var queryString = "SELECT * FROM " + tblInput + ";";
    // query to SQL database
    connection.query(queryString, [tblInput], function(err, result){
      if (err) return err;

      // data object from query
      cb(result);
    });
  },

  // ORM method to add burger data into the SQL database
  create: function(tblInput, col, val, cb){
    var queryString = "INSERT INTO" + tblInput;
    queryString = " (" + col.toString() + ") " + "VALUES (" + printQuestionMarks(val.length) + ") ";

    // check to see what queryString above looks like
    console.log(queryString, val, function(err, result){
      if (err) return err;

      // data object from query
      cb(result);
    });

    // query to SQL database
    connection.query(queryString, function(err, results){
      if (err) return err;

      // data object from query
      cb(result);
    })
  }, 

  // ORM method to update SQL database (consume burger, changes "devour" to TRUE(1))
  update: function(tblInput, objColVal, condition, cb){
    // SQL syntax to query
    var queryString = "UPDATE" + tblInput;

    queryString = " SET " + objToSql(objColVal) + " WHERE " + condition;
    // how do I get condition above === TRUE when user doesn't input it? Must switch FALSE --> TRUE
    
    // query to SQL database
    connection.query(queryString, function(err, result){
      if (err) return err;

      // data object from query
      cb(result);
    });
  }
};

// exporting the ORM object to burger.js file in models
module.exports = orm;