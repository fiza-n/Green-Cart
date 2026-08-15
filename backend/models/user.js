import {mongoose, model} from "mongoose"

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    cartItems:{
        type:Object,
        default:{}
    },

   role:{
    type:String,
    enum: ["USER", "ADMIN"],
    default:"USER"
   }
}, {timestamps: true}, {minimize: false})

const User = mongoose.model("user", userSchema)

export default User