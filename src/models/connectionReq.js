const mongoose = require('mongoose')

const connectionReqSchema = new mongoose.Schema({
  fromUserId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  toUserId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status:{
    type: String,
    required: true,
    enum:{
      values:["pending","interested","rejected","ignored","accepted"],
      message:`{VALUE} is not supported`
    }
  }
},{timestamps:true})
connectionReqSchema.index({fromUserId:1, toUserId:1}, {unique:true})
connectionReqSchema.pre('save', function(next){
  const connectionReq= this

  if(connectionReq.fromUserId.equals(connectionReq.toUserId)){
    throw new Error('cannot send request to yourself')
  }


})

const ConnectionReq = mongoose.model('ConnectionReq', connectionReqSchema)
module.exports = ConnectionReq













































// const mongoose= require('mongoose')
// const connectionReq= new mongoose.Schema({
// fromUserId:{
//     type: mongoose.Schema.Types.ObjectId,
//     required: true

// },
// toUserId:{
//     type: mongoose.Schema.Types.ObjectId,
//     required: true
// },
// status:{
//     type: String,
//     required: true,
//     enum:{
//         values:["pending","interested","rejected","ignored"],
//         message: `{values} is not supported`,
//     },
// }

// }, {timestamps: true})
//  connectionReq.pre('save', function(next){
//   const connectionReq = this

//   if(connectionReq.fromUserId.equals(connectionReq.toUserId)){
//      throw new Error('cannot send request to yoursef')
//   }

//   next()
// })
    
 
        
    
 
// const ConnectionReq= mongoose.model('ConnectionReq', connectionReq)
// module.exports= ConnectionReq;