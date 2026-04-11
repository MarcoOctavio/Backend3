import { usersService } from "../services/index.js"
import CustomError from '../errors/customError.js';
import { errorDictionary } from '../errors/errorsDictionary.js';

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
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
    req.logger.info(`Deleted user with ID: ${userId}`);
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
}