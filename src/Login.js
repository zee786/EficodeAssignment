import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { has, isEmpty } from "lodash";

import { Typography, Button, Stack, Grid } from "@mui/material";
import { getEvents, getToken, login } from "./MiddlewareAPI";
import { useHistory, Route, Switch } from "react-router-dom";
import TextField from "@mui/material/TextField";
import EventDetails from "./EventDetails";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState(false);

  const [tokenResponse, setTokenResponse] = useState(false);
  const [events, setEvents] = useState({});
  const history = useHistory();

  console.log("history", history);

  const handleChange = event => {
    setEmail(event.target.value);
  };

  const handleLogin = async () => {
    try {
      if (email && password) {
        const loginResponse = await login(email, password);
        if (loginResponse === null) {
          console.log("loginResponse", loginResponse);
        } else {
          setAuthToken(loginResponse.accessToken);
          history.push("/Events");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleToken = async () => {
    try {
      if (email && password) {
        const response = await getToken(email, password);
        if (response === null) {
          setTokenResponse(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(authToken);

  return (
    <Grid container justifyContent="center">
      {!authToken ? (
        <div>
          <Typography variant="h3" gutterBottom marginTop={50} align="center">
            Login
          </Typography>
          <div>
            <Typography align="center">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" }
                }}
                noValidate
                autoComplete="off"
                justifyContent="center"
              >
                <TextField
                  id="outlined-email"
                  label="Email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-password"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  onChange={event => {
                    setPassword(event.target.value);
                  }}
                />
                {tokenResponse && <div>Already SignUp, please Login</div>}
                <div>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" }
                    }}
                    noValidate
                    autoComplete="off"
                    justifyContent="center"
                  >
                    <Button variant="outlined" onClick={handleLogin}>
                      Login
                    </Button>
                    <Button variant="outlined" onClick={handleToken}>
                      SignUp
                    </Button>
                  </Box>
                </div>
              </Box>
            </Typography>
          </div>
        </div>
      ) : (
        <Switch>
          <Route exact path="/Events">
            <EventDetails token={authToken} />
          </Route>
        </Switch>
      )}
    </Grid>
  );
};

export default Login;
