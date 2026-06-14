import chai from "chai";
import supertest from "supertest";
import app from "../src/app.js";
import { faker } from "@faker-js/faker";

const expect = chai.expect;
const requester = supertest(app);

describe("Users Router", () => {

    let userId;

    it("Debe crear un usuario", async () => {

        const response = await requester
            .post("/api/sessions/register")
            .send({
                first_name: "Doc",
                last_name: "Test",
                email: faker.internet.email(),
                age: 25,
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
