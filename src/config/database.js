const mongoose=require('mongoose')
const ConnectDB= async()=>{
//await mongoose.connect('mongodb+srv://saadnode:fBd45iI0i968ZWzw@saadnode.bvlplpr.mongodb.net/devtinder')
await mongoose.connect(process.env.MONGO_URI)
}
module.exports= ConnectDB
