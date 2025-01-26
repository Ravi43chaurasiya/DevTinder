const mongoose=require("mongoose");
const validator=require("validator");

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
      if(!["male","female","oyhers"].includes(value)){
        throw new Error("Gender data is not valid"); 
      }
    }
  },
  photoUrl:{
    type: String,
    default: "https://weimaracademy.org/dummy-user/"
  },
  about:{
    type: String,
    default: "this is the default about."
  },
  skills:{
    type: [String]
  }
},{ timestamps: true });

const User=mongoose.model("User",userSchema);

module.exports=User;