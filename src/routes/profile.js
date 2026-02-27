const express=  require('express')
const profileRouter= express.Router()
const validateprofileedit= require('../utils/validation').validateprofileedit
const {AdminAuth} = require('../middlewares/auth')
const User= require('../models/user')
profileRouter.get('/profile/view',AdminAuth,async(req,res)=>{
 const user=req.user
   try {
   
  res.send(user)
  console.log(user)
}
 
   
catch(err){
  res.status(401).send(err.message)
    console.log(err.message)
}
})

//  profileRouter.patch('/profile/edit',AdminAuth,async(req,res)=>{
//   try{if(!validateprofileedit(req)){
//     throw new Error('invalid input for profile edit')
//   }
//   const user= req.user
//   console.log(user)


//   }catch(err){
//     console.log(err.message)
//   }
//  })
profileRouter.patch('/profile/edit', AdminAuth, async (req, res) => {
  try {
    // Validate incoming fields
    if (!validateprofileedit(req)) {
      throw new Error('Invalid input for profile edit');
    }

    const user = req.user;

    // Only allow updating specific fields
    const allowedUpdates = ['firstName', 'lastName', 'password', 'age', 'gender', 'photoUrl', 'about', 'skills'];
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    res.status(200).send({ message: `${user.firstName} updated profile successfully`, user });
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ error: err.message });
  }
});



module.exports= profileRouter