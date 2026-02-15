const express=require('express')
const app= express();
const ConnectDB=require('./config/database')
const User=require('./models/user')
app.use(express.json())
//get specific user
app.use('/user',async(req,res)=>{
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
    console.log(req.body)
    
const user=new User(req.body)
try
{
    await user.save()
res.send('user added or sign sucessfully')
}
catch(err){
res.status(400).send('found an error' + err.message)
}
})





ConnectDB().then(()=>{
    console.log('Database connect suceesfully')
    app.listen(3000,()=>{
        console.log('server is listening on the port 3000')
    })


}).catch(err=>{
console.log('cannot connect database + err.message')
})
