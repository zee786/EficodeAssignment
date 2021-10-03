const eventModel = require("../models/events.model");

// Create and Save a event
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
};
// Retrieve all events.
exports.findAll = (req, res) => {
  eventModel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else {
      console.log("data", data);
      res.send(data);
    }
  });
};
