import React, { useState } from "react";
import { getEvents } from "./MiddlewareAPI";
import { Button, Typography } from "@mui/material";
import {
  useHistory,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
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
    <Router>
    
      <Login />
    </Router>
  );
}

export default App;
