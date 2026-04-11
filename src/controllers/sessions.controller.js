import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) 
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        const exists = await usersService.getUserByEmail(email);
        if (exists) 
            return res.status(400).send({ status: "error", error: "User already exists" });
        req.logger.info(`Attempting to register user with email: ${email}`);
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        }
        let result = await usersService.create(user);
        console.log(result);
        res.send({ status: "success", payload: result._id });
        req.logger.info(`User registered with email: ${email}`);
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal Server Error" });
        req.logger.error(`Error in register controller: ${error.message}`);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) 
        return res.status(400).send({ status: "error", error: "Incomplete values" });
    req.logger.info(`Attempting to log in user with email: ${email}`);
    const user = await usersService.getUserByEmail(email);
    if(!user) 
        return res.status(404).send({status:"error",error:"User doesn't exist"});
    req.logger.info(`User found with email: ${email}, validating password`);
    const isValidPassword = await passwordValidation(user,password);
    if(!isValidPassword) 
        return res.status(400).send({status:"error",error:"Incorrect password"});
    req.logger.info(`Password validated for user with email: ${email}, generating token`);
    const userDto = UserDTO.getUserTokenFrom(user);
    const token = jwt.sign(userDto,'tokenSecretJWT',{expiresIn:"1h"});
    res.cookie('coderCookie',token,{maxAge:3600000}).send({status:"success",message:"Logged in"})
    req.logger.info(`User logged in with email: ${email}`);
}

const current = async(req,res) =>{
    const cookie = req.cookies['coderCookie']
    const user = jwt.verify(cookie,'tokenSecretJWT');
    if(user)
        return res.send({status:"success",payload:user})
    req.logger.info(`Current user retrieved with email: ${user.email}`);
}

const unprotectedLogin  = async(req,res) =>{
    const { email, password } = req.body;
    if (!email || !password) 
        return res.status(400).send({ status: "error", error: "Incomplete values" });
    req.logger.info(`Attempting to log in user with email: ${email} (unprotected)`);
    const user = await usersService.getUserByEmail(email);
    if(!user) 
        return res.status(404).send({status:"error",error:"User doesn't exist"});
    const isValidPassword = await passwordValidation(user,password);
    if(!isValidPassword) 
        return res.status(400).send({status:"error",error:"Incorrect password"});
    const token = jwt.sign(user,'tokenSecretJWT',{expiresIn:"1h"});
    res.cookie('unprotectedCookie',token,{maxAge:3600000}).send({status:"success",message:"Unprotected Logged in"})
    req.logger.info(`User logged in with email: ${email} (unprotected)`);
}
const unprotectedCurrent = async(req,res)=>{
    const cookie = req.cookies['unprotectedCookie']
    const user = jwt.verify(cookie,'tokenSecretJWT');
    if(user)
        return res.send({status:"success",payload:user})
    req.logger.info(`Current user retrieved with email: ${user.email} (unprotected)`);
}
export default {
    current,
    login,
    register,
    current,
    unprotectedLogin,
    unprotectedCurrent
}