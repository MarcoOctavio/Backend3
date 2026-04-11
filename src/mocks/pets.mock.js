import { faker } from '@faker-js/faker';

export const generateMockPet = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.animal.petName(),
        specie: faker.animal.type(),
        birthDate: faker.date.past(),
        adopted: false,
        owner: null
    };
};

export const generateMockPets = (quantity) => {
    const pets = [];

    for (let i = 0; i < quantity; i++) {
        pets.push(generateMockPet());
    }

    return pets;
};