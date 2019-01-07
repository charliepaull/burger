// GOAL: set up working server for express & express-handlebars

// require express
var express = require("express");

// create a PORT
var PORT = process.env.PORT || 3000;

// set up express
var app = express();

// serve static content from specific directories
app.use(express.static("public"));  // for burger_style.css 
app.use(express.static("models")); // for burger.js?


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require Handlebars
var exphbs = require("express-handlebars");

// set up Handlebars, seto 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");