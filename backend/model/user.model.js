import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetOTP:{
        type:String
    },
    resetOTPExpires:{
        type:Date
    },
    lastOTPSentAt:{
        type:Date
    },
    listing:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    }],
    booking:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    }],
    role: {
        type: String,
        enum:["user", "admin"],
        default: "user"
    }
}, {timestamps:true});

const User = mongoose.model("User", userSchema);
export default User;