import PetModel from "../dao/models/Pet.js";

class PetService {

    async createMany(pets) {

        return await PetModel.insertMany(pets);

    }

}

export default new PetService();