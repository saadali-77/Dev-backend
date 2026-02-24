const express= require('express')
const userRouter= express.Router()
const {AdminAuth}= require('../middlewares/auth')
const ConnectionReq = require('../models/connectionReq')
const User= require('../models/user')
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
userRouter.get('/user/feed',AdminAuth, async(req,res)=>{

    try{
const loggedinUser= req.user
const page= parseInt(req.query.page) || 1
let limit= parseInt(req.query.limit) || 10
limit= limit>100?100:limit
const skip= (page-1)*limit
const connectionReqs= await ConnectionReq.find({
    $or:[{
        fromUserId:loggedinUser._id
    },
    {
        toUserId:loggedinUser._id
    }]
}).select("fromUserId toUserId")
const hideUser= new Set()
connectionReqs.forEach((req)=>{
    hideUser.add(req.fromUserId.toString())
    hideUser.add(req.toUserId.toString())
})
//console.log(hideUser)
const users= await User.find({
$and:[
    {_id:{$ne:loggedinUser._id}},
    {_id:{$nin:Array.from(hideUser)}}
]

}).select("firstName lastName ").skip(skip).limit(limit)
res.json(users)

    }
    catch(err){
        res.status(400).send(err.message)
    }
})

module.exports= userRouter;