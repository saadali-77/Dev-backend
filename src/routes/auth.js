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
    const {password,firstName,lastName,emailId,photoUrl,skills,age}= req.body
    const hashedPassword= await bcrypt.hash(password,10)
    console.log(hashedPassword)
const user=new User({firstName,lastName,emailId,password:hashedPassword,photoUrl,skills,age})
    await user.save()
res.send('user added or sign sucessfully')
}
catch(err){
res.status(400).send('found an error' + err.message)
}
})
authRouter.post('/login',async(req,res)=>{
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
     // res.send('login successfull')
     res.send(user)
  } else{
 throw new Error('invalid credentials')
  }
}
catch(err){
    res.status(404).send(err.message)
}})
authRouter.post('/logout',async(req,res)=>{
  res.cookie('token',null,
               
    {httpOnly: true,
  secure: true,       // HTTPS only (required for Vercel)
  sameSite: 'none',   // allows cross-domain
              
              expires: new Date(Date.now())})
  res.send('logout sucessfully')
  
})









 module.exports= authRouter
