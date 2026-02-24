const express= require('express')
const userRouter= express.Router()
const {AdminAuth}= require('../middlewares/auth')
const ConnectionReq = require('../models/connectionReq')
userRouter.get('/user/requests/received',AdminAuth,async(req,res)=>{
    try{

        const loggedinUser= req.user


   const connectionReqs= await ConnectionReq.find({toUserId: loggedinUser._id, status:'interested'}).populate("fromUserId",["firstName","lastName","photoUrl","about","age"])
 res.json({message:'data fetched  now successfully', data:connectionReqs})
    } catch(err){
        res.send(err.message)
    }
})

userRouter.get('/user/connections',AdminAuth, async(req,res)=>{
    const loggedinUser= req.user
    try{
        const connectionReqs= await ConnectionReq.find({
            $or:[{
                fromUserId:loggedinUser._id,status:"accepted"
            },
            {
                toUserId:loggedinUser._id,status:"accepted"
            }]
        }).populate("fromUserId toUserId",["firstName","lastName","photoUrl","about","age","skills","gender","status"]

        ).populate("toUserId",["firstName","lastName","photoUrl","about","age", "skilla","gender","status"])
   const data= connectionReqs.map((row)=> {
    if(row.fromUserId._id.equals(loggedinUser._id)){
        return row.toUserId
    }
    return row.fromUserId
   })


        res.json({message:'data fetched  now successfully', data})
    }catch(err){
        res.send(err.message)
    }
})


module.exports= userRouter;