// importing express & burger.js 

// require express
var express = require("express");

// easier way to make routes using express?
var router = express.Router();

// require burger.js
var burger = require("../models/burger.js");

// GOAL: Create all routes (.get, .post, .put)
// invoking .all, .create, .update method from burger.js (querying from SQL db using JS methods)

// .get route to select * from data (inject into index.handlebars)
router.get("/", function(req, res){
    burger.allBurgers(function(data){
        // callback with SQL data
        // object created makes injecktion into handlebars easier(?)
        var hbsObject = {
            burger: data
        };

        // check if response works
        // console.log(data)
        // send hbsObject to index.handlebars
        res.render("index", { burger: data});
    });
});

// .post route, add to SQL database. (not going to client)
router.post("/api/burgers", function(req, res){
    burger.newBurger(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result){
        // retreive ID of the new burger item
        // res.json - formatting
        res.json(({ id: result.insertID}));
    });
});

// .put route, updating SQL database (devoured isTrue/isFalse)
router.put("/api/burger/:id", function(req, res){
    // create condition of burger based on query ID
    var condition = "id = " + req.params.id;
    // console log check
    console.log("condition", condition);

    // update devour by ID
    burger.devourerBurger(
        {
            devoured: req.body.devoured
        },
        condition,
        function(result){
            // check to see if ID exists
            if (result.changedRows === 0){
                // return an error
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

// export router for server.js to use
module.exports = router; 