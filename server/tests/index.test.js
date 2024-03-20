const request = require("supertest");

const app = require("../index");

describe("POST and DELETE", () => {
  test("Register and Delete user return status code 200", async () => {
    const response = await request(app)
      .post("/runners")
      .send({
        name: "FirstName LastName",
        dateOfBirth: new Date("2000-06-08"),
      });

    const parsedData = await JSON.parse(response.text);
    const deleteURL = "/runners".concat("/", parsedData.runner_id);

    const deleteUserResponse = await request(app).delete(deleteURL);

    expect(response.statusCode).toBe(200);
    expect(deleteUserResponse.statusCode).toBe(200);
  });

  test("Register pre-existing user should return status code 403", async () => {
    const response = await request(app)
      .post("/runners")
      .send({
        name: "TestName TestName2",
        dateOfBirth: new Date("2000-06-08"),
      });

    const secondResponse = await request(app)
      .post("/runners")
      .send({
        name: "TestName TestName2",
        dateOfBirth: new Date("2004-12-02"),
      });

    expect(secondResponse.statusCode).toBe(403);
  });
});
