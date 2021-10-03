const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const getToken = require("./models/getToken");
const app = express();
const dbConfig = require("./config/db.config");
let mysql = require("mysql");
let connection = mysql.createConnection(dbConfig.configuration);
let currentDate = new Date();
let currentHours = currentDate.setHours(currentDate.getHours() + 1);
let newDate = new Date(currentHours);
console.log(newDate);

getToken;
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get("/getAllEvents", (req, res) => {
  connection.query("SELECT * FROM events", (err, rows) => {
    if (err) {
      console.log("error: ", err);
      return err;
    }
    console.log(rows);

    return res.send(rows);
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
