let configuration = {
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = {
  configuration
};
