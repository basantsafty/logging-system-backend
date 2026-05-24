import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: (name) => {
                return /^\S*$/.test(name);
            },
            message: "Invalid application name."
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Developer",
    required: true,
    }

});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
