import * as React from "react";
import Table from "@mui/material/Table";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { isEmpty } from "lodash";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const EventsData = ({ events }) => {
  const classes = useStyles();
  console.log("events", events);
  return (
    <>
      <Typography gutterBottom marginTop={10} align="center">
        {isEmpty(events) && "No Data"}
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Sensor 1</TableCell>
              <TableCell align="left">Sensor 2</TableCell>
              <TableCell align="left">Sensor 3</TableCell>
              <TableCell align="left">Sensor 4</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events &&
              events.map(event => (
                <TableRow
                  key={event.Id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {event.Id}
                  </TableCell>
                  <TableCell align="left">{event.date}</TableCell>
                  <TableCell align="left">{event.sensor1}</TableCell>
                  <TableCell align="left">{event.sensor2}</TableCell>
                  <TableCell align="left">{event.sensor3}</TableCell>
                  <TableCell align="left">{event.sensor4}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EventsData;
