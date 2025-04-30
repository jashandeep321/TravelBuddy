import mongoose from "mongoose";
const userSchema=mongoose.Schema(
    {
    email:String,
    username:String,
    password:String,
    isAdmin:{ type: Boolean, default: false },

    }
)
const User=mongoose.model("User",userSchema);
export default User;