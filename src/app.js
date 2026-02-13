const express=require('express')

const app= express();
app.use('/test',(req,res,next)=>{
   // res.send(' welcome back imran khan 111')
    next()
},(req,res,next)=>{
   // res.send('welcome imran 222')
    next()
},(req,res)=>{
    res.send('welcome imran 333')
})
app.get('/user/:userid',(req,res)=>{
    console.log(req.params)
    res.send({
        firstName:'saad',
        lastName:'ali'
    })
})



app.listen(3000,()=>{
    console.log('server is listening on port 3000')
})