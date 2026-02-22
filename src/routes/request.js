const express = require('express')
const requestRouter = express.Router()
const User = require('../models/user')
const ConnectionReq = require('../models/connectionReq')
const { AdminAuth } = require('../middlewares/auth')

requestRouter.post('/request/send/:status/:toUserId', AdminAuth, async(req,res)=>{
  try{
    const fromUserId = req.user._id
    const { toUserId, status } = req.params

    const allowedStatus = ['ignored','interested']
    if(!allowedStatus.includes(status)){
      throw new Error('status is not valid')
    }

    const toUser = await User.findById(toUserId)
    if(!toUser){
      return res.status(404).send('user does not exist')
    }

    const existingReq = await ConnectionReq.findOne({
      $or:[
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    })

    if(existingReq){
      throw new Error('connection request already exists')
    }

    const connectionReq = new ConnectionReq({ fromUserId, toUserId, status })
    const data = await connectionReq.save()

    res.json({
      message: `${req.user.firstName} sent connection request to ${toUser.firstName} with status ${status}`,
      data
    })

  }catch(err){
    res.status(400).send(err.message)
  }
})

module.exports = requestRouter





























































// const express= require('express')
// const requestRouter= express.Router()
// const User= require('../models/user')
// const ConnectionReq= require('../models/connectionReq')
// const {AdminAuth} = require('../middlewares/auth')
// requestRouter.post('/request/send/:status/:toUserId',AdminAuth,async(req,res)=>{
//     try{
//         const fromUserId= req.user._id
//         const toUserId= req.params.toUserId
//         const status= req.params.status
//     const allowedsatus= ['ignored','interested']
//     if(!allowedsatus.includes(status)){
//     throw new 
//     Error('status is not valid')
//     }
//    const touser= await User.findById(toUserId)
//    if(!touser){
//     throw new Error('userid does not exist')
//    }

//    const existingReq= await ConnectionReq.findOne({
//     $or:[
//         {fromUserId,toUserId},
//         {fromUserId:toUserId,toUserId:fromUserId}
//     ]

//    })
//   if(existingReq){
//     throw new Error('connection request already exists')
//   }
//      const connectionReq =  new ConnectionReq({fromUserId,toUserId,status})
//       const data=   await connectionReq.save()
//    res.json({
//     message: 'connection request sent',
//     data
//    })
//     }
// catch(err){
//     res.status(400).send(err.message)
// }



//     res.send(user.firstName + ' send connection request')
//     console.log('send connection request')
// })









// module.exports= requestRouter