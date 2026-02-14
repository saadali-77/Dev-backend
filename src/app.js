const express=require('express')

const app= express();

 const {AdminAuth}= require('./middlewares/auth.js')

app.use('/admin',AdminAuth)
app.get('/admin/data',(req,res)=>{
    res.send('get admin all data that')
})




app.listen(3000,()=>{
    console.log('server is listening on the port 3000')
})