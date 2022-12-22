import supertest from "supertest";
import app from "./app";
import userJson from "./profile.json";

const request = supertest(app);

describe("Test Server", () => {
    test("GET /users/", async () => {
        const response = await request
            .get("/users/")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(userJson)
    });

    test("GET /users/1", async () => {
        const response = await request
            .get("/users/1")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(userJson[0])
    });
});
