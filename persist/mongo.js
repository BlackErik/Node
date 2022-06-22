// npm install mongoose --save
const mongoose = require("mongoose");

const db = mongoose.connection;

function connect(user, password, host, port, db) {
  const connectionString = "";
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

function setUpConnectionHandlers(callback) {
  // when connecting
  db.once("connecting", () => {
    console.log("Connecting to MongoDB");
  });

  // when connected
  db.once("connected", () => {
    console.log("Connected to MongoDB");
  });

  // when connection is open
  db.once("open", () => {
    console.log("Open Connection to MongoDB");
    callback();
  });

  // when there is an error in connecting
  db.once("error", () => {
    console.log("Error Connecting to MongoDB");
  });
}

module.exports = {
  connect,
  setUpConnectionHandlers,
};
