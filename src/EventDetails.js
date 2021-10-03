import React, { useState, useEffect } from "react";
import { getEvents } from "./MiddlewareAPI";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import Home from "./Login";
import { Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const EventDetails = ({ token }) => {
  const history = useHistory();
  const [events, setEvents] = useState({});

  console.log("login");
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const eventResponse = await getEvents(token);
        history.push("/Events");
        setEvents(eventResponse);
      }
    };

    fetchData();
  }, [token]);
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
      </div>
      <Typography gutterBottom marginTop={50} align="center">
        Events
        <div className="App">Date: {events?.date}</div>
        <div>Sensor1: {events?.sensor1}</div>
        <div>Sensor2: {events?.sensor2}</div>
        <div className="App">Sensor3: {events?.sensor3}</div>
      </Typography>
    </Router>
  );
};

export default EventDetails;
