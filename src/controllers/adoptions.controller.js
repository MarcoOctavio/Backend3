import { adoptionsService, petsService, usersService } from "../services/index.js"

const getAllAdoptions = async(req,res)=>{
    const result = await adoptionsService.getAll();
    req.logger.info("Adoptions retrieved");
    res.send({status:"success",payload:result})
}

const getAdoption = async(req,res)=>{
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({_id:adoptionId})
    if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})
    req.logger.info(`Adoption retrieved: ${adoptionId}`);
    res.send({status:"success",payload:adoption})
}

const createAdoption = async(req,res)=>{
    const {uid,pid} = req.params;
    const user = await usersService.getUserById(uid);
    if(!user) {
        req.logger.warning(`User not found: ${uid}`);
        return res.status(404).send({status:"error", error:"user Not found"});
    }
    const pet = await petsService.getBy({_id:pid});
    if(!pet) {
        req.logger.warning(`Pet not found: ${pid}`);
        return res.status(404).send({status:"error",error:"Pet not found"});
    }
    if(pet.adopted) {
        req.logger.warning(`Pet is already adopted: ${pid}`);
        return res.status(400).send({status:"error",error:"Pet is already adopted"});
    }
    user.pets.push(pet._id);
    await usersService.update(user._id,{pets:user.pets})
    await petsService.update(pet._id,{adopted:true,owner:user._id})
    await adoptionsService.create({owner:user._id,pet:pet._id})
    req.logger.info(`Pet adopted: ${pid} by user: ${uid}`);
    res.send({status:"success",message:"Pet adopted"})
}

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}