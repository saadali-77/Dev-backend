const express=  require('express')
const profileRouter= express.Router()

const {AdminAuth} = require('../middlewares/auth')
profileRouter.get('/profile',AdminAuth,async(req,res)=>{
 const user=req.user
   try {
   
  res.send(user)
  console.log(user)
}
 
   
catch(err){
    console.log(err.message)
}}
)


module.exports= profileRouter