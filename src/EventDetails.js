import React, { useState } from "react";
import { getEvents } from "./MiddlewareAPI";
import { Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const EventDetails = ({ events }) => {
  const history = useHistory();
  console.log("history", events);
  return (
    <div>
      <div>
        <Button variant="outlined" style={{ alignItems: "center" }}>
          Back to Login
        </Button>
      </div>
      <Typography variant="h3" gutterBottom>
        Events
      </Typography>
      <Typography align="center">
        <div className="App">Date: {events?.date}</div>
        <div className="App">Sensor1: {events?.sensor1}</div>
        <div className="App">Sensor2: {events?.sensor2}</div>
        <div className="App">Sensor3: {events?.sensor3}</div>
      </Typography>
    </div>
  );
};

export default EventDetails;
