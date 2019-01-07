var connection = require("../config/connection.js");

// ORM helps create query methods
// The last variable cb represents the anonymous function being passed from server.js

var orm = {
  // ORM method to select everything from the table
  selectAll: function(tblInput, cb){
    // set-up of SQL table query - what am I looking for within database?
    var queryString = "SELECT * FROM " + tblInput + ";";
    // connection.query to query the database from SQL (connection already set up)
    connection.query(queryString, [tblInput], function(err, result){
      if (err) return err;

      // data object from query
      cb(result);
    });
  },

  // ORM method to add data into the SQL database
  insertOne: function(tblInput, col, )
};

/* create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

     * `selectAll()`
     * `insertOne()`
     * `updateOne()`

   * Export the ORM object in `module.exports`.*/