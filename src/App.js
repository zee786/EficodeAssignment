import React, { useState } from "react";
import { getEvents } from "./MiddlewareAPI";
import { Button, Typography } from "@mui/material";
import Login from "./Login";
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
          <p>Login</p>
        </center>
      </h1>
      <Login />
    </>
  );
}

export default App;
