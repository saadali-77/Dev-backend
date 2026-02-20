const express=require('express')
const app= express();
const cookieparser= require('cookie-parser')
const ConnectDB=require('./config/database')

//const User=require('./models/user')
 
 //const jwt=require('jsonwebtoken')
 
app.use(express.json())
app.use(cookieparser())
const authRouter= require('./routes/auth')
const profileRouter= require('./routes/profile')
const requestRouter= require('./routes/request')
app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)


//get specific user
// app.get('/user',async(req,res)=>{
//     const email= req.body.emailId
//     try{
//    const users=  await User.findOne({emailId:email})
//    if(users.length===0){
//     res.status(404).send('not found user with this  emailid')
//    }else{
//        res.send(users)


//    }
//  }catch(err){
//     console.log(err.message)
//  }
// })
// //delete api to delete user from db
// app.delete('/user',async(req,res)=>{
//     const userId=req.body.userId
//     try{
//     const user=  await  User.findByIdAndDelete(userId)
//     res.send('user delete successfully from database')
//     }catch(err){
//         console.log(err.message)
//     }
// })
// app.patch('/user/:userId',async(req,res)=>{
//     const userId=req.params.userId
//     const data= req.body
//     try { 
//     AllowedUpdates=['firstName','lastName','password','age','gender','photoUrl','about','skills','userId']
//     const isAllowed= Object.keys(data).every((key)=>AllowedUpdates.includes(key))
//     if(!isAllowed){
//         throw new Error('you are not allowed to update this field')
//     }
//     if(data?.skills?.length>10){
//         throw new Error('skills should be less than 10')
//     }
//     await User.findByIdAndUpdate({_id:userId},data,{
//     runValidators:true
// })
// res.send('user update sucessfully')
// console.log('user update sucessfully')
// }catch(err){
//     console.log(err.message)
// }

// })



// //feed will get all user from db just put {}
// app.use('/feed',async(req,res)=>{
//     const email= req.body
// try{const users= await User.find({})
// if(users.length===0){
//     res.status(400).send('not found user')
// }
// else{
//    res.send(users)
// }
// }catch(err){
// console.log('something go wrong')
// }
// })








ConnectDB().then(()=>{
    console.log('Database connect now  suceesfully')
    app.listen(3000,()=>{
        console.log('server is listening on the port 3000')
    })


}).catch(err=>{
console.log('cannot connect database + err.message')
})
