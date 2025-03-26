const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
  firstName:{
    type:String,
    required: true,
    minLength: 4 ,
    maxLength: 100

  },
  lastName:{
    type:String
  },
  emailId:{
    type:String,
    required:true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email address!");
      }
    }

  },
  password:{
    type:String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("weak password, please enter a strong password!")
      }
    }
  },
  age:{
    type:Number,
    min: 18
  },
  gender:{
    type:String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Gender data is not valid"); 
      }
    }
  },
  photoUrl:{
    type: String,
    default: "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
  },
  about:{
    type: String,
    default: "this is the default about."
  },
  skills:{
    type: [String],
    default: []
  }
},{ timestamps: true });

// this keyword does not work with arrow function.
userSchema.methods.getJWT=async function(){
  const user=this;
  const token=await jwt.sign({_id:user._id},"dev@tinder$secretKey",{expiresIn:"1d"});
  return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
  const user=this;
  const isPasswordValid=await bcrypt.compare(passwordInputByUser,user.password);

  return isPasswordValid;
  
}

const User=mongoose.model("User",userSchema);

module.exports=User;