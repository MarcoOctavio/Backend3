import chai from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';
import { faker } from '@faker-js/faker';

const expect = chai.expect;

const requester = supertest(app);

describe('Pets Router', () => {

    let petId;
    before(async () => {

    const petMock = {
        name: "TestPet",
        specie: "Dog",
        birthDate: "2020-01-01"
    };

    const response = await requester
        .post('/api/pets')
        .send(petMock);

    petId = response.body.payload._id;

});

    /*
    =========================
    GET ALL PETS
    =========================
    */

    it('Debe obtener todas las mascotas', async () => {

        const response = await requester.get('/api/pets');

        expect(response.status).to.equal(200);

        expect(response.body).to.have.property('payload');

        expect(response.body.payload).to.be.an('array');
    });

    /*
    =========================
    CREATE PET
    =========================
    */

    it('Debe crear una mascota', async () => {

        const newPet = {
            name: "Firulais",
            specie: "Dog",
            birthDate: "2020-01-01"
        };

        const response = await requester
            .post('/api/pets')
            .send(newPet);

        expect(response.status).to.equal(200);

        expect(response.body.status)
            .to.equal('success');

        expect(response.body.payload)
            .to.have.property('_id');

        petId = response.body.payload._id;
    });

    it('Debe crear una mascota con datos dinámicos', async () => {

    const petMock = {
        name: faker.person.firstName(),
        specie: faker.animal.type(),
        birthDate: faker.date.past(),
    };

    const response = await requester
        .post('/api/pets')
        .send(petMock);

    expect(response.status).to.equal(200);

    expect(response.body.payload)
        .to.have.property('_id');

});

    /*
    =========================
    UPDATE PET
    =========================
    */

    it('Debe actualizar una mascota', async () => {

        if (!petId) return;

        const update = {
            name: "Firulais Updated"
        };

        const response = await requester
            .put(`/api/pets/${petId}`)
            .send(update);

        expect(response.status).to.equal(200);

        expect(response.status).to.equal(200);

        expect(response.body).to.have.property('status');

        expect(response.body.status).to.equal('success');

        if (response.body.payload) {
            expect(response.body.payload).to.have.property('name');
}
    });

    /*
    =========================
    DELETE PET
    =========================
    */

    it('Debe eliminar una mascota', async () => {

        if (!petId) return;

        const response = await requester
            .delete(`/api/pets/${petId}`);

        expect(response.status).to.equal(200);

        expect(response.body.status)
            .to.equal('success');
    });

    /*
    =========================
    VALIDATION TEST
    =========================
    */

    it('Debe fallar si faltan datos obligatorios', async () => {

        const invalidPet = {};

        const response = await requester
            .post('/api/pets')
            .send(invalidPet);

        expect(response.status)
            .to.be.oneOf([400, 500]);

        expect(response.body)
            .to.have.property('error');
    });

});