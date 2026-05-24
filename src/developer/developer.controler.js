import Developer from "./developer.model.js"
import { request, response } from "express"
import jwt from "jsonwebtoken"
import crypto from "crypto"

export const registerUser = async(request,response,next)=>{
    try {
        const {name,email,password} = request.body
        if(!name || !email || !password){
            return response.status(400).json({
                message:"Name, email, and password are required"
            })
        }
        const existingUser = await Developer.findOne({email})
        if(existingUser){
            return response.status(409).json({
                message:"Email already exists"
            })
        }   
        const apiKey = crypto.randomBytes(16).toString("hex"); //creating random api key for each user
        const user = await Developer.create({name,email,password,apiKey})
        response.status(201).json({
            message:"User created successfully",
            user
        })
        
    } catch (error) {
        next(error);
    }
}
