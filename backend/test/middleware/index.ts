import request from "supertest";
import { app } from "../../src/app";

describe("Middleware", () => {
  it("should return 404", async () => {
    await request(app)
      .get("/api/doesnotexist")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Cannot GET /api/doesnotexist",
          status: 404,
        });
      });
  });
});
