const express= require('express')
const requestRouter= express.Router()
const User= require('../models/user')
const {AdminAuth} = require('../middlewares/auth')
requestRouter.post('/sendconnectionRequest',AdminAuth,async(req,res)=>{
    const user=req.user
    res.send(user.firstName + ' send connection request')
    console.log('send connection request')
})









module.exports= requestRouter