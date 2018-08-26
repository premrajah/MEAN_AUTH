const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

// local
const config = require('./config/database');

// connect to database
mongoose.connect(config.database);

// on db connection
mongoose.connection.on('connected', () => {
    console.log('connected to db ', config.database);
});

// on db connection error
mongoose.connection.on('error', (err) => {
    console.log('db error:  ', err);
});

const app = express();

const users = require('./routes/users');

// port number for page
const port = 3000;

// uses cores module for cross-domain
app.use(cors());

// set static folder files
app.use(express.static(path.join(__dirname, 'public')));

// body-parser middleware
app.use(bodyParser.json());

app.use("/users", users);

//temp - index route
app.get("/", (req, res) => {
    res.send("Invalid endpoint.");
});


// start server
app.listen(port, () => {
    console.log("Server started on port: ", port);
});
