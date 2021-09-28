import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, Button, Stack, Grid } from "@mui/material";
import { getEvents, getToken, login } from "./MiddlewareAPI";

import TextField from "@mui/material/TextField";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [tokenResponse, setTokenResponse] = React.useState(false);

  const handleChange = event => {
    setEmail(event.target.value);
  };

  const handleLogin = async () => {
    if (email && password) {
      const loginResponse = await login(email, password);
      const authToken = loginResponse.accessToken;

      if (authToken) {
        const eventResponse = await getEvents(authToken);
        console.log("event", eventResponse);
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
  console.log(tokenResponse);

  return (
    <Grid container justifyContent="center">
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
    </Grid>
  );
};

export default Login;
