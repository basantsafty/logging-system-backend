import Developer from "./developer.model.js"
import { request, response } from "express"
const apiKey=1234567 // This is a placeholder API key.
export const registerUser = async(request,response,next)=>{
    try {
        const {name,email,password} = request.body
        const user = await Developer.create({name,email,password,apiKey})
        response.status(201).json({
            message:"User created successfully",
            user
        })
        
    } catch (error) {
        next(error);
    }
}
