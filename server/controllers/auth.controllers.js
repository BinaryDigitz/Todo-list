import { NODE_ENV } from "../config/env.js";
import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import UserModel from "../models/user.model.js";
import Joi from 'joi'
import bcrypt from 'bcrypt'

// CREATE USER: /api/users/sign-up
export const registerUser = asyncMiddleware ( async (req, res) =>{
    const { error } = validateRegister(req.body)
    if(error) return res.json({ success: false, message: error.details[0].message, statusCode: 400 })

    const { name, email, password } = req.body
    const isUserExisting = await UserModel.findOne({email})
    if(isUserExisting) return res.json({ success: false, message: 'User already exist', statusCode:400})
    
    const hashedPassword = await bcrypt.hash(password, 10)
    let user = await UserModel.create({name, email, password: hashedPassword})

    const token = await user.generateToken()
    res.cookie('token', token, {
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 2 * 24 * 60 * 60 * 1000
    })

    const { password: pass, ...rest } = user._doc
    return res.json({ success: true, message: 'User created successfully', data: rest, token })
})

// LOGIN USER: /api/users/login
export const loginUser = asyncMiddleware ( async ( req, res) =>{

})


async function validateRegister( user){
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
    })
    try{
        return schema.validate(user)
    }
    catch(ex){
        log(ex.message)
    }
}
