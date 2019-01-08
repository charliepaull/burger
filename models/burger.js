/* 
    *create code that will call the ORM functions using 
    burger specific input for the ORM.
    * Export at the end of the `burger.js` file.    
*/

// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

// use ORM template methods and connect to burgers db to interact
var burger = {
    // select all from database
    allBurgers: function(cb){
        orm.all("burgers", function(res){
            cb(res);
        });
    },

    // user creates new burger (added to database)
    newBurger: function(cb){
        orm.create("burgers", col, val, function(res){
            cb(res);
        });
    },

    // user devourer
    devourerBurger: function(cb){
        orm.update("burgers", objColVal, condition, function(res){
            cb(res);
        });
    }
};

// export burger.js (will go to controller)
module.exports = burger;

