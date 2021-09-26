import React, { useState } from "react";
import { getEvents } from "./MiddlewareAPI";

import "./App.css";

function App() {
  const [events, setEvents] = useState({});
 
  const getEventsData = async () => {
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
      <div className="App">{events?.date}</div>
      <div className="App">{events?.sensor1}</div>
      <div className="App">{events?.sensor2}</div>
      <div className="App">{events?.sensor3}</div>

    </>
  );
}

export default App;
