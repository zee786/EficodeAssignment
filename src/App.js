import React, { useState } from "react";
import { getEvents } from "./MiddlewareAPI";
import { Button, Typography } from "@mui/material";

import "./App.css";

function App() {
  const [events, setEvents] = useState({});

  const handleClick = async () => {
    const eventDetails = await getEvents();

    setEvents(eventDetails);
    console.log(eventDetails);
  };
  return (
    <>
      <h1>
        <center>
          <p>Events</p>
        </center>
      </h1>
      <div className="App">Date: {events?.date}</div>
      <div className="App">Sensor1: {events?.sensor1}</div>
      <div className="App">Sensor2: {events?.sensor2}</div>
      <div className="App">Sensor3: {events?.sensor3}</div>
      <Typography align="center">
        <Button
          variant="outlined"
          style={{ alignItems: "center" }}
          onClick={handleClick}
        >
          Get Events
        </Button>
      </Typography>
    </>
  );
}

export default App;
