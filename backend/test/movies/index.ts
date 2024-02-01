import request from "supertest";
import { app } from "../../src/app";

const firstMovieTitle = "The Matrix";
const firstMovieId = 1;

const firstMovieComplete = {
  id: firstMovieId,
  title: firstMovieTitle,
};

const secondMovieTitle = "Finding Nemo";
const secondMovieId = 2;

const secondMovieComplete = {
  id: secondMovieId,
  title: secondMovieTitle,
};

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
        title: firstMovieTitle,
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(firstMovieComplete);
      });
  });

  it("should return a movie", async () => {
    await request(app)
      .get(`/api/movies/${firstMovieId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(firstMovieComplete);
      });
  });

  it("should create 2nd movie", async () => {
    await request(app)
      .post("/api/movies")
      .send({
        title: secondMovieTitle,
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(secondMovieComplete);
      });
  });

  it("should return 2 movies", async () => {
    await request(app)
      .get("/api/movies")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([
          firstMovieComplete,
          secondMovieComplete,
        ]);
      });
  });

  it("should delete a movie", async () => {
    await request(app)
      .delete(`/api/movies/${firstMovieId}`)
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });

  it("should return 1 movie", async () => {
    await request(app)
      .get("/api/movies")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([secondMovieComplete]);
      });
  });

  it("should return 404", async () => {
    await request(app)
      .get(`/api/movies/${firstMovieId}`)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Movie not found",
          status: 404,
        });
      });
  });

  it("should return 400 when id is not numeric", async () => {
    await request(app)
      .delete(`/api/movies/abc`)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Id must be a number",
          status: 400,
        });
      });
  });

  it("should return 400 when title is missing", async () => {
    await request(app)
      .post("/api/movies")
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Title is required",
          status: 400,
        });
      });
  });

  it("should return 400 when title is empty", async () => {
    await request(app)
      .post("/api/movies")
      .send({ title: "" })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Title is required",
          status: 400,
        });
      });
  });

  it("should return 400 when title is too short", async () => {
    await request(app)
      .post("/api/movies")
      .send({ title: "a" })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Title must be minimum 3 characters",
          status: 400,
        });
      });
  });
});
