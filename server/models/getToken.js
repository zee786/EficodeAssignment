const axios = require("axios");
const eventModel = require("../models/events.model");

let data = JSON.stringify({
  email: "msss@gmail.com",
  password: "Madiha@786"
});

let token = null;
let events = null;

async function loadToken() {
  try {
    response = await axios({
      method: "POST",
      url: "https://opendata.hopefully.works/api/signup",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        email: "msss@gmail.com",
        password: "Madiha@7867"
      })
    });
    let data = response.data;
    token = data;
    return token.accessToken;
  } catch (err) {
    console.log("err in loadToken", err.response.status);
    return err.response.status;
  }
}

async function login() {
  try {
    response = await axios({
      method: "POST",
      url: "https://opendata.hopefully.works/api/login",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        email: "mss@gmail.com",
        password: "Madiha@786"
      })
    });
    let data = response.data;
    return data.accessToken;
  } catch (err) {
    console.log("err in Login", err.response.status);
    return err.response.status;
  }
}

async function getEvents(authToken) {
  try {
    response = await axios({
      method: "GET",
      url: "https://opendata.hopefully.works/api/events",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      }
    });
    let data = response.data;
    return data;
  } catch (err) {
    console.log("error in getEvents", err.response.status);
    return err.response.status;
  }
}
async function SignUp() {
  const response = await loadToken();
  if (response !== 400) {
    events = await getEvents(token);
    return events;
  }
  if (response === 400) {
    token = await login();

    if (token) {
      events = await getEvents(token);
      if (events !== {} && events !== null) {
        eventModel.getAll("results");
      }
    }
  }
}
SignUp();
