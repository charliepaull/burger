// GOAL: set up working server for express & express-handlebars

// require express
var express = require("express");

// create a PORT
var PORT = process.env.PORT || 3000;

// set up express
var app = express();

// serve static content from specific directories
app.use(express.static("public"));  // for burger_style.css 

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require Handlebars
var exphbs = require("express-handlebars");

// set up Handlebars, seto 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function(){
    console.log("WE ARE LIIIIVE ON " + PORT);
});