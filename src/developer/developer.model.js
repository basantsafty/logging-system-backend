import mongoose from "mongoose";
import bcrypt from "bcrypt";

const developerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: (email) => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
            },
            message: "Invalid email or password."
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:20
    }
    ,
    apiKey:{
        type:String,
        required:true,
        unique:true
    }
});
developerSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});
const Developer = mongoose.model("Developer", developerSchema);
export default Developer;