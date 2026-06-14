import { usersService } from "../services/index.js"
import { createHash } from "../utils/index.js";

const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
    req.logger.info(`Retrieved all users, count: ${users.length}`);
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
    req.logger.info(`Retrieved user with ID: ${userId}`);
}

const createUser = async(req,res)=> {
    const { first_name, last_name, email, age, password } = req.body;
    if(!first_name||!last_name||!email||!password) {
        return res.status(400).send({status:"error",error:"Incomplete values"})
    }
    const exists = await usersService.getUserByEmail(email);
    if(exists) {
        return res.status(400).send({status:"error",error:"User already exists"})
    }
    const hashedPassword = await createHash(password);
    const result = await usersService.create({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword
    });
    res.send({status:"success",payload:result})
    req.logger.info(`Created user with email: ${email}`);
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
    req.logger.info(`Updated user with ID: ${userId}`);
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    await usersService.delete(userId);
    res.send({status:"success",message:"User deleted"})
    req.logger.info(`Deleted user with ID: ${userId}`);
}

export default {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
}
