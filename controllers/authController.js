const { findUserByEmail, registerUser } = require("../models/userModel")

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { default: ApiResponse } = require("../config/ApiResponse")
dotenv.config()

async function login(req,res){
    try {
        console.log('request received');
        
        const {email, password} = req.body
        const user = await findUserByEmail(email)

        if(!user){
            return ApiResponse(res,false,400,'user not found',null)
        }

        if(!(await bcrypt.compare(password, user.password))){
            return ApiResponse(res,false,400,'invalid credentials',null)
        }

        const token = jwt.sign({id:user.id, role:user.role}, process.env.JWT_SECRET, {expiresIn:'1h'})
        return ApiResponse(res,true,200,'query successful',token)
    } catch (error) {
        ApiResponse(res,false,500,error.message, null)
    }
}

async function register(req,res){
    try {
        console.log('request body = ', req.body);
        const {name, email,password} = req.body
        const existingUser = await findUserByEmail(email)
        if(existingUser){
            return ApiResponse(res, false, 200, 'User Already Exists !')
        }
        const savedUser = await registerUser(name,email,password);
        console.log(savedUser);
        return ApiResponse(res,true,201,'User registered successfully',savedUser)
    } catch (error) {
        return ApiResponse(res,false,500,error.message)
    }
}

module.exports = {
    login,register
}