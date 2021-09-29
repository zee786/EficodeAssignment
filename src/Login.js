import { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Button, Stack, Grid } from "@mui/material";
import { getEvents, getToken, login } from "./MiddlewareAPI";
import {
  useHistory,
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import TextField from "@mui/material/TextField";
import EventDetails from "./EventDetails";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tokenResponse, setTokenResponse] = useState(false);
  const [events, setEvents] = useState({});
  const history = useHistory();

  console.log("history", history);

  const handleChange = event => {
    setEmail(event.target.value);
  };

  const handleLogin = async () => {
    if (email && password) {
      const loginResponse = await login(email, password);
      const authToken = loginResponse.accessToken;

      if (authToken) {
        const eventResponse = await getEvents(authToken);
        setEvents(eventResponse);
      }
    }
  };
  const handleToken = async () => {
    if (email && password) {
      const response = await getToken(email, password);
      if (response === null) {
        setTokenResponse(true);
      }
    }
  };
  console.log(events && "Events");

  return (
    <Grid container justifyContent="center">
      {!events ? (
        <>
          <h1>
            <center>
              <p>Login</p>
            </center>
          </h1>
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
            <Typography align="center">
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={handleLogin}>
                  Login
                </Button>
                <Button variant="outlined" onClick={handleToken}>
                  SignUp
                </Button>
              </Stack>
            </Typography>
          </Box>
        </>
      ) : (
        <Switch>
          <Route exact path="/Events">
            <EventDetails events={events} />
          </Route>
        </Switch>
      )}
    </Grid>
  );
};

export default Login;
