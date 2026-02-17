const express=require('express')
const app= express();
const cookieparser= require('cookie-parser')
const ConnectDB=require('./config/database')
const {AdminAuth} =require('./middlewares/auth')
const User=require('./models/user')
 const signupvalidate= require('./utils/validation')
 const jwt=require('jsonwebtoken')
 const bcrypt= require('bcrypt')
app.use(express.json())
app.use(cookieparser())
//get specific user
app.get('/user',async(req,res)=>{
    const email= req.body.emailId
    try{
   const users=  await User.findOne({emailId:email})
   if(users.length===0){
    res.status(404).send('not found user with this  emailid')
   }else{
       res.send(users)


   }
 }catch(err){
    console.log(err.message)
 }
})
//delete api to delete user from db
app.delete('/user',async(req,res)=>{
    const userId=req.body.userId
    try{
    const user=  await  User.findByIdAndDelete(userId)
    res.send('user delete successfully from database')
    }catch(err){
        console.log(err.message)
    }
})
app.patch('/user/:userId',async(req,res)=>{
    const userId=req.params.userId
    const data= req.body
    try { 
    AllowedUpdates=['firstName','lastName','password','age','gender','photoUrl','about','skills','userId']
    const isAllowed= Object.keys(data).every((key)=>AllowedUpdates.includes(key))
    if(!isAllowed){
        throw new Error('you are not allowed to update this field')
    }
    if(data?.skills?.length>10){
        throw new Error('skills should be less than 10')
    }
    await User.findByIdAndUpdate({_id:userId},data,{
    runValidators:true
})
res.send('user update sucessfully')
console.log('user update sucessfully')
}catch(err){
    console.log(err.message)
}

})



//feed will get all user from db just put {}
app.use('/feed',async(req,res)=>{
    const email= req.body
try{const users= await User.find({})
if(users.length===0){
    res.status(400).send('not found user')
}
else{
   res.send(users)
}
}catch(err){
console.log('something go wrong')
}
})

app.post('/signup',async(req,res)=>{
    try
    {
    signupvalidate(req)
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
app.get('/login',async(req,res)=>{
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
app.get('/profile',AdminAuth,async(req,res)=>{
 const user=req.user
   try {
   
  res.send(user)
  console.log(user)
}
 
   
catch(err){
    console.log(err.message)
}}
)
app.post('/sendconnectionRequest',AdminAuth,async(req,res)=>{
    const user=req.user
    res.send(user.firstName + ' send connection request')
    console.log('send connection request')
})



ConnectDB().then(()=>{
    console.log('Database connect suceesfully')
    app.listen(3000,()=>{
        console.log('server is listening on the port 3000')
    })


}).catch(err=>{
console.log('cannot connect database + err.message')
})
