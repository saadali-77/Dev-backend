const express=require('express')

const app= express();
app.use('/test',(req,res)=>{
    res.send('hello guyz welcome back imran khan')
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