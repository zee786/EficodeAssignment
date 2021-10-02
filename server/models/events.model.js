const dbConfig = require("../config/db.config");
let mysql = require("mysql");
let connection = mysql.createConnection(dbConfig.configuration);

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
// constructor
const Event = function(event) {
  this.date = event.date;
  this.sensor1 = event.sensor1;
  this.sensor2 = event.sensor2;
  this.sensor3 = event.sensor3;
};

Event.create = (newEvent, result) => {
  const { date, sensor1, sensor2, sensor3, sensor4 } = newEvent;

  let sql =
    "INSERT INTO events(date,sensor1, sensor2,sensor3, sensor4) VALUES(?,?,?,?, ?)";

  // execute the insert statment
  connection.query(
    sql,
    [date, sensor1, sensor2, sensor3, sensor4],
    (err, results, fields) => {
      if (err) {
        console.error(err.message);
        result(err, null);
        return result;
      }
      // get inserted rows
      console.log("Event inserted:" + results.affectedRows);
    }
  );
};

Event.getAll = result => {
  connection.query("SELECT * FROM events", (err, res) => {
    if (err) {
      console.log("error: ", err);

      return err;
    }

    console.log("events: ", res);
    return res;
  });
};

module.exports = Event;
