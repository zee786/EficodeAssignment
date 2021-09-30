import React, { useState } from "react";
import { getEvents } from "./MiddlewareAPI";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import "./App.css";

function App() {
  return (
    <Router>
      <Login />
    </Router>
  );
}

export default App;
