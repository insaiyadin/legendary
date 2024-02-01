import request from "supertest";
import { app } from "../../src/app";

describe("Movies", () => {
  it("should return empty array", async () => {
    await request(app)
      .get("/api/movies")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([]);
      });
  });

  it("should create a movie", async () => {
    await request(app)
      .post("/api/movies")
      .send({
        title: "The Matrix",
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: 1,
          title: "The Matrix",
        });
      });
  });

  it("should return a movie", async () => {
    await request(app)
      .get("/api/movies/1")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          id: 1,
          title: "The Matrix",
        });
      });
  });
});
