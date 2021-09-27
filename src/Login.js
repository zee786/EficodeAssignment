import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, Button, Stack, Grid } from "@mui/material";
import { getEvents, getToken } from "./MiddlewareAPI";

import TextField from "@mui/material/TextField";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [tokenResponse, setTokenResponse] = React.useState(false);

  const handleChange = event => {
    setEmail(event.target.value);
  };

  const handleClick = () => {
    console.log("Click");
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
            onChange={event => {
              setPassword(event.target.value);
            }}
          />
          {tokenResponse && <div>Already SignUp, please Login</div>}
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={handleClick}>
              Login
            </Button>
            <Button variant="outlined" onClick={handleToken}>
              SignUp
            </Button>
          </Stack>
        </Box>
      </Typography>
    </Grid>
  );
};

export default Login;
