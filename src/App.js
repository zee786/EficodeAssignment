import React, { useEffect, useState } from "react";
import { compose } from "recompose";
import { getEvents } from "./MiddlewareAPI";
import Axios from "axios";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import EventsData from "./ShowEventsData";
import "./App.css";

function App() {
  const [events, setEvents] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const eventResponse = await getEvents();
      setEvents(eventResponse);
    };
    fetchData();
  }, []);
  return (
    <Router>
      <EventsData events={events} />
    </Router>
  );
}

export default App;
