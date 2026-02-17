const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 8
    },
    lastName: {
      type: String
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is not valid: " + value)
        }
      }
    },
    password: {
      type: String,
      required:true,
      validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("Enter strong password value: " + value)
        }
      }
    },
    age: {
      type: Number,
      min: 18
    },
    gender: {
      type: String,
      validate(value) {
        if (!['male', 'female', 'others'].includes(value)) {
          throw new Error('gender data is not valid')
        }
      }
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("photo url is not valid: " + value)
        }
      }
    },
    about: {
      type: String,
      default: 'this is information about the user',
      maxLength: 100
    },
    skills: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
)
userSchema.methods.getjwt= function(){
  const user=this
  const token= jwt.sign({_id:user._id},'pnjiiiii',{expiresIn:'1h'})
  return token
}
userSchema.methods.validatePassword= async function(password){
  const user=this
  const isPasswordValid= await bcrypt.compare(password,user.password)
  return isPasswordValid
}

const User = mongoose.model('User', userSchema)
module.exports = User
