const mongoose = require("mongoose");

let isConnected = false;

const ConnectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(mongodb+srv://saadnode:Rysnqi5O4dPH7wTi@cluster0.jmcv49s.mongodb.net/devtinders);

  isConnected = true;
  console.log("MongoDB Connected");
};

module.exports = ConnectDB;
