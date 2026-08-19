// const mongoose = require("mongoose");

// let isConnected = false;

// const ConnectDB = async () => {
//   if (isConnected) return;

//   await mongoose.connect(process.env.MONGODB_URI);

//   isConnected = true;
//   console.log("MongoDB Connected successfully");
// };

// module.exports = ConnectDB;

const mongoose = require("mongoose");

let isConnected = false;

const ConnectDB = async () => {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  isConnected = true;

  console.log("MongoDB connected successfully");
};

module.exports = ConnectDB;