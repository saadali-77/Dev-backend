const express=  require('express')
 const authRouter= express.Router()
  const User= require('../models/user')
  const {validateSignup}= require('../utils/validation')
  //const jwt=require('jsonwebtoken')
  const bcrypt= require('bcrypt')
  //const { AdminAuth } = require('../middlewares/auth')

authRouter.post('/signup',async(req,res)=>{
    try
    {
    validateSignup(req)
    console.log(req.body)
    const {password,firstName,lastName,emailId}= req.body
    const hashedPassword= await bcrypt.hash(password,10)
    console.log(hashedPassword)
const user=new User({firstName,lastName,emailId,password:hashedPassword})
    await user.save()
res.send('user added or sign sucessfully')
}
catch(err){
res.status(400).send('found an error' + err.message)
}
})
authRouter.get('/login',async(req,res)=>{
    const {emailId,password}= req.body
try{

 const user=   await User.findOne({emailId:emailId})
 if(!user){
    return res.status(404).send('invalid credentials')
 }
  const ispasswordvalid= await user.validatePassword(password)
  if(ispasswordvalid){
    const token= await user.getjwt()
   // const token= await jwt.sign({_id:user._id},'pnjiiiii',{expiresIn:'1h'})
 console.log(token)
    res.cookie('token',token,{expires: new Date(Date.now()+3600000)})
      res.send('login successfull')
  } else{
 throw new Error('invalid credentials')
  }
}
catch(err){
    console.log(err.message)
}})
authRouter.post('/logout',async(req,res)=>{
  res.cookie('token',null,{expires: new Date(Date.now())})
  res.send('logout sucessfully')
  
})









 module.exports= authRouter