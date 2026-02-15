const express=require('express')
const app= express();
const ConnectDB=require('./config/database')
const User=require('./models/user')
app.use(express.json())

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
