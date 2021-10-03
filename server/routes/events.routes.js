module.exports = app => {
  const eventModel = require("../models/events.model");
  app.get("/getAllEvents", eventModel.getAll);
};
