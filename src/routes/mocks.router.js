import { Router } from "express";
import { generateMockUsers} from "../mocks/user.mock.js";
import { generateMockPets } from "../mocks/pets.mock.js";
import userService from "../services/user.services.js";
import petService from "../services/pet.service.js";

const router = Router();

// Endpoint temporal para probar
router.get("/", (req, res) => {
    res.send("Mocks router funcionando");
});


router.get("/mockingpets", async (req, res) => {
    try {
        const pets = generateMockPets(100);

        res.send({
            status: "success",
            payload: pets
        });

    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        });
    }
});

router.get("/mockingusers", (req, res) => {

    try {

        const users = generateMockUsers(50);

        res.send({
            status: "success",
            payload: users
        });

    } catch (error) {

        res.status(500).send({
            status: "error",
            error: error.message
        });

    }

});

router.post("/generateData", async (req, res) => {

    try {

        const { users, pets } = req.body;

        if (!users || !pets) {

            return res.status(400).send({
                status: "error",
                message: "Users and pets are required"
            });

        }

        const mockUsers = generateMockUsers(users);
        const mockPets = generateMockPets(pets);

        await userService.createMany(mockUsers);
        await petService.createMany(mockPets);

        res.send({
            status: "success",
            message: "Data generated successfully"
        });

    } catch (error) {

        res.status(500).send({
            status: "error",
            error: error.message
        });

    }

});

export default router;