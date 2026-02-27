const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
        const domain = value.split('@')[1]
        if (!["gmail.com","yahoo.com","outlook.com"].includes(domain)) {
          throw new Error("Email domain is not supported. Use gmail.com, yahoo.com, or outlook.com")
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
  default:
    "https://static.vecteezy.com/system/resources/previews/052/755/981/non_2x/a-man-profile-avatar-icon-with-a-white-background-free-vector.jpg",
  validate(value) {
    if (
      !validator.isURL(value, {
        protocols: ["http", "https"],
        require_protocol: true,
        allow_query_components: true, // ✅ allow ?v=...
      })
    ) {
      throw new Error("photo url is not valid: " + value);
    }
  },
},
    // photoUrl: {
    //   type: String,
    //   default:"https://static.vecteezy.com/system/resources/previews/052/755/981/non_2x/a-man-profile-avatar-icon-with-a-white-background-free-vector.jpg",
    //  // default:"https://media.gettyimages.com/id/2216206881/photo/jack-della-maddalena-ufc-shoot.jpg?s=612x612&w=gi&k=20&c=ZzhZ0phBoa7uXRzHI_20shmPNCnHDVD6ZLuoqPdbHZI= ",
    //   validate(value) {
    //     if (!validator.isURL(value)) {
    //       throw new Error("photo url is not valid: " + value)
    //     }
    //   }
    // },
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
