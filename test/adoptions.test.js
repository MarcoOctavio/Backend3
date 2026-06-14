import chai from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';
import { faker } from '@faker-js/faker';

const expect = chai.expect;
const requester = supertest(app);

describe('Adoptions Router', () => {
  let userId;
  let petId;
  let adoptionId;

  before(async () => {
    const userMock = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 70 }),
      password: '123456'
    };

    const userResponse = await requester
      .post('/api/sessions/register')
      .send(userMock);

    expect(userResponse.status).to.equal(200);
    userId = userResponse.body.payload._id;

    const petMock = {
      name: faker.animal.dog(),
      specie: 'Dog',
      birthDate: '2022-01-01'
    };

    const petResponse = await requester
      .post('/api/pets')
      .send(petMock);

    expect(petResponse.status).to.equal(200);
    petId = petResponse.body.payload._id;
  });

  it('Debe crear una adopción correctamente', async () => {
    const response = await requester.post(`/api/adoptions/${userId}/${petId}`);

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.message).to.equal('Pet adopted');
  });

  it('Debe obtener todas las adopciones y encontrar la adopción creada', async () => {
    const response = await requester.get('/api/adoptions');

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.payload).to.be.an('array');

    const createdAdoption = response.body.payload.find(adoption => {
      const owner = adoption.owner?._id || adoption.owner;
      const pet = adoption.pet?._id || adoption.pet;
      return owner?.toString() === userId && pet?.toString() === petId;
    });

    expect(createdAdoption).to.exist;
    adoptionId = createdAdoption._id;
  });

  it('Debe obtener una adopción por ID', async () => {
    const response = await requester.get(`/api/adoptions/${adoptionId}`);

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.payload).to.have.property('_id', adoptionId);
  });

  it('Debe rechazar una adopción si la mascota ya fue adoptada', async () => {
    const response = await requester.post(`/api/adoptions/${userId}/${petId}`);

    expect(response.status).to.equal(400);
    expect(response.body.status).to.equal('error');
    expect(response.body.error).to.equal('Pet is already adopted');
  });

  it('Debe retornar 404 si el usuario no existe', async () => {
    const fakeUserId = '64f000000000000000000001';
    const response = await requester.post(`/api/adoptions/${fakeUserId}/${petId}`);

    expect(response.status).to.equal(404);
    expect(response.body.status).to.equal('error');
  });
});
