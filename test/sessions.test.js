import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Sessions Router", () => {

    let testUser;

    describe("POST /api/sessions/register", () => {

        it("Debe registrar un usuario correctamente", async () => {

            testUser = {
                first_name: "Test",
                last_name: "User",
                email: "testuser@example.com",
                age: 30,
                password: "123456"
            };

            const response = await requester
                .post("/api/sessions/register")
                .send(testUser);

            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal("success");

        });

    });

    describe("POST /api/sessions/login", () => {

        it("Debe loguear un usuario correctamente", async () => {

            const response = await requester
                .post("/api/sessions/login")
                .send({
                    email: testUser.email,
                    password: testUser.password
                });

            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal("success");

        });

    });

});