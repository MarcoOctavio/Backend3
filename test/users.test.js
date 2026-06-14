import chai from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';
import { faker } from '@faker-js/faker';

const expect = chai.expect;

const requester = supertest(app);

describe('Users Router', () => {

    let userId;

    it('Debe crear un usuario correctamente', async () => {

    const userMock = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: "123456",
    };

    const response = await requester
        .post('/api/users')
        .send(userMock);

    expect(response.status).to.equal(200);

});

    /*
    =========================
    GET ALL USERS
    =========================
    */

    it('Debe obtener todos los usuarios', async () => {

        const response = await requester.get('/api/users');

        expect(response.status).to.equal(200);

        expect(response.body).to.have.property('status');
        expect(response.body.status).to.equal('success');

        expect(response.body).to.have.property('payload');

        expect(response.body.payload).to.be.an('array');
    });

    /*
    =========================
    GET USER BY ID
    =========================
    */

    it('Debe obtener un usuario por ID', async () => {

        const usersResponse = await requester.get('/api/users');

        const users = usersResponse.body.payload;

        if (users.length === 0) return;

        userId = users[0]._id;

        const response = await requester.get(`/api/users/${userId}`);

        expect(response.status).to.equal(200);

        expect(response.body.payload).to.be.an('object');

        expect(response.body.payload).to.have.property('_id');
    });

    /*
    =========================
    UPDATE USER
    =========================
    */

    it('Debe actualizar un usuario', async () => {

        if (!userId) return;

        const updatedUser = {
            first_name: "UpdatedName"
        };

        const response = await requester.put(`/api/users/${userId}`)
            .send(updatedUser);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal('success');

        expect(response.status).to.equal(200);

        expect(response.body).to.have.property('status');

        expect(response.body.status).to.equal('success');
    });

    /*
    =========================
    DELETE USER
    =========================
    */

    it('Debe eliminar un usuario', async () => {

        if (!userId) return;

        const response = await requester.delete(`/api/users/${userId}`);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal('success');
    });

    /*
    =========================
    ERROR CASE
    =========================
    */

    it('Debe retornar error si el usuario no existe', async () => {

        const fakeId = "64f000000000000000000000";

        const response = await requester.get(`/api/users/${fakeId}`);

        expect(response.status).to.be.oneOf([404, 400]);

        expect(response.body).to.have.property('error');
    });

    it("Debe registrar un usuario", async () => {

        const response = await requester
            .post("/api/sessions/register")
            .send({
                first_name: "Doc",
                last_name: "Test",
                email: faker.internet.email(),
                password: "123456"
            });

        userId = response.body.payload._id;

        expect(userId).to.exist;

    });

    it("Debe subir documentos al usuario", async () => {

        const response = await requester
            .post(`/api/users/${userId}/documents`)
            .attach(
                "documents",
                "./test/files/test.pdf"
            );

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");

    });


});
