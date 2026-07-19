const mongoose = require("mongoose");

let isConnected = false;

const ConnectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGODB_URI);

  isConnected = true;
  console.log("MongoDB Connected");
};

module.exports = ConnectDB;
