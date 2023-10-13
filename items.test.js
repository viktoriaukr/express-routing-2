process.env.NODE_ENV === "test";
const request = require("supertest");
const app = require("./app");
const items = require("./fakeDB");

let item = { name: "popsicle", price: 1.45 };

beforeEach(() => {
  items.push(item);
});

afterEach(() => {
  items.length = 0;
});

describe("GET /items", () => {
  test("Testing route that returns all items on the list", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ items: [item] });
  });
});

describe("POST /items", () => {
  test("Testing route that creates a new item on the list", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "cheerios", price: 3.4 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({ added: { name: "cheerios", price: 3.4 } });
  });
  test("Testing route that fails because of missing values", async () => {
    const res = await request(app).post("/items").send({});
    expect(res.statusCode).toEqual(400);
  });
});

describe("GET /items/:name", () => {
  test("Testing route that responds with requested item", async () => {
    const res = await request(app).get(`/items/${item.name}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ added: { name: "popsicle", price: 1.45 } });
  });

  test("Invalid input", async () => {
    const res = await request(app).get(`/items/sdfkhjsdhjf`);
    expect(res.statusCode).toEqual(404);
  });
});

describe("PATCH /items/:name", () => {
  test("Testing route that edits item's information", async () => {
    const res = await request(app)
      .patch(`/items/${item.name}`)
      .send({ name: "cheerios", price: 3.4 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ added: { name: "cheerios", price: 3.4 } });
  });
  test("Invalid input", async () => {
    const res = await request(app)
      .patch(`/items/taco`)
      .send({ name: "cheerios", price: 3.4 });
    expect(res.statusCode).toEqual(404);
  });
});

describe("DELETE /items/:name", () => {
  test("Deleting item", async () => {
    const res = await request(app).delete(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });
  test("Invalid input", async () => {
    const res = await request(app).delete(`/items/jsjfhs`);
    expect(res.statusCode).toBe(404);
  });
});
