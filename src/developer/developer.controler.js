import Developer from "./developer.model.js"
import { request, response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "crypto"

export const registerDeveloper = async(request,response,next)=>{
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
export const loginDeveloper = async(request,response,next)=>{
    try {
        const {email,password} = request.body;
        if(!email || !password){
            return response.status(400).json({
                message:"Email and password are required"
            })
        }
        const user = await Developer.findOne({email})
        if(!user){
            return response.status(404).json({
                message:"User not found"
            })
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return response.status(401).json({
                message:"Invalid password"
            })
        }
        const token = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:"1d"})
        response.status(200).json({
            message:"Login successful",
            token,
            apiKey:user.apiKey
        })
    }
        catch (error) { 
        next(error);
        }
}
export default {registerDeveloper,loginDeveloper}