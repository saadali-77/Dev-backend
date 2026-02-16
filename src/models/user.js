const mongoose= require('mongoose')
const userSchema= mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:8
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
        if(!['male','female','others'].includes(value)){
            throw new Error('gender data is not valid')
        }
    }},
    photoUrl:{
        type:String
    },
    about:{
        type:String,
        default:'this is information about the user'
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
})
const User= mongoose.model('User',userSchema)
module.exports= User