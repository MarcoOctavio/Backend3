import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tokenSecretJWT';

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
        res.send({ status: "success", payload: result });
        req.logger.info(`User registered with email: ${email}`);
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal Server Error" });
        req.logger.error(error.stack);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await usersService.getUserByEmail(email);

    if (!user) {
        return res.status(404).send({ status: "error", message: "User not found" });
    }

    if (!await passwordValidation(user, password)) {
        req.logger.info(`Failed login attempt for email: ${email} - Invalid password`);
        return res.status(401).send({ status: "error", message: "Invalid credentials" });
    }
    user.last_connection = new Date();
    await user.save();
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie('coderCookie', token, { maxAge: 3600000, httpOnly: true }).send({ status: "success", message: "Login successful" });
    req.logger.info(`User logged in with email: ${email}`);
};

const logout = async (req, res) => {
    const cookie = req.cookies['coderCookie'];
    let userId;

    if (cookie) {
        const sessionUser = jwt.verify(cookie, JWT_SECRET);
        userId = sessionUser.id;
        const user = await usersService.getUserById(userId);

        if (user) {
            user.last_connection = new Date();
            await user.save();
        }
    }

    res.clearCookie('coderCookie').send({
        status: "success",
        message: "Logout successful"
    });
    req.logger.info(`User logged out with ID: ${userId}`);
}

const current = async(req,res) =>{
    const cookie = req.cookies['coderCookie']
    const user = jwt.verify(cookie, JWT_SECRET);
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
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET,{expiresIn:"1h"});
    res.cookie('unprotectedCookie',token,{maxAge:3600000}).send({status:"success",message:"Unprotected Logged in"})
    req.logger.info(`User logged in with email: ${email} (unprotected)`);
}
const unprotectedCurrent = async(req,res)=>{
    const cookie = req.cookies['unprotectedCookie']
    const user = jwt.verify(cookie, JWT_SECRET);
    if(user)
        return res.send({status:"success",payload:user})
    req.logger.info(`Current user retrieved with email: ${user.email} (unprotected)`);
}
export default {
    register,
    login,
    logout,
    current,
    unprotectedLogin,
    unprotectedCurrent
}
