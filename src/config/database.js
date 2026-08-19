const mongoose = require("mongoose");

let isConnected = false;

const ConnectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(mongodb+srv://saadnode:Rysnqi5O4dPH7wTi@cluster0.jmcv49s.mongodb.net/?appName=Cluster0
Rysnqi5O4dPH7wTi);

  isConnected = true;
  console.log("MongoDB Connected");
};

module.exports = ConnectDB;
