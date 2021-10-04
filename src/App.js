import React, { useEffect, useState } from "react";
import { getEvents } from "./MiddlewareAPI";
import EventsData from "./ShowEventsData";
import { isEmpty } from "lodash";
import "./App.css";

// const ONE_HOUR = 60 * 60 * 1000;
function App() {
  const [events, setEvents] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      /*  const intervalId = setInterval(async () => {
        const eventResponse = await getEvents();
        setEvents(eventResponse);
      }, ONE_HOUR);
      return () => clearInterval(intervalId);
    }; */
      const eventResponse = await getEvents();
      setEvents(eventResponse);
    };

    fetchData();
  }, []);
  if (isEmpty(events))
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>Waiting for Data</div>
    );
  return (
    <>
      <EventsData events={events} />
    </>
  );
}

export default App;
