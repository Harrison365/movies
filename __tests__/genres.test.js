const { seed } = require("../db/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/genres", () => {
  test("status: 200, responds with an array of genre objects", () => {
    return request(app)
      .get("/api/genres")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.genres)).toBe(true);
        expect(body.genres.length).toBe(3);
        body.genres.forEach((genre) => {
          expect(genre).toHaveProperty("slug", expect.any(String));
        });
      });
  });
});
