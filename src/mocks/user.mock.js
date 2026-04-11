import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const hashedPassword = bcrypt.hashSync("coder123", 10);

export const generateMockUsers = (num) => {
    const users = [];

    for (let i = 0; i < num; i++) {

        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),

            email: faker.internet.email(),

            password: hashedPassword,

            role: faker.helpers.arrayElement([
                "user",
                "admin"
            ]),

            pets: []
        });
    }

    return users;
};