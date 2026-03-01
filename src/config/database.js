const mongoose = require('mongoose');

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Atlas connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err; // so the server knows the DB didn't connect
  }
};

module.exports = ConnectDB;










//const mongoose=require('mongoose')
//const ConnectDB= async()=>{
//await mongoose.connect('mongodb+srv://saadnode:fBd45iI0i968ZWzw@saadnode.bvlplpr.mongodb.net/devtinder')
//await mongoose.connect(process.env.MONGO_URI)
//}
//module.exports= ConnectDB
