import { generateMockPets } from '../mocks/pets.mock.js';

export const getMockingPets = (req, res) => {

    const quantity = req.query.quantity || 100;

    const pets = generateMockPets(quantity);

    res.send({
        status: 'success',
        payload: pets
    });

};