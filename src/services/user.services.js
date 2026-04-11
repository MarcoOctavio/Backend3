import UserModel from "../dao/models/User.js";

class UserService {

    async createMany(users) {

        return await UserModel.insertMany(users);

    }

}

export default new UserService();