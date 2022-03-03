const request = require("supertest");
const express = require("express");
const router = require("../routes/transactionRoutes");
const app = express();

app.use(express.json());
app.use("/", router);

describe("first POST /add", function () {
  test("add 1st points", async () => {
    const res = await request(app).post("/add").send({
      payer: "DANNON",
      points: 1000,
      timestamp: "2020-11-02T14:00:00Z",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual("Transaction with DANNON completed successfully.");
  });
});

describe("second POST /add", function () {
  test("add 2nd points", async () => {
    const transaction = await request(app).post("/add").send({
      payer: "UNILEVER",
      points: 200,
      timestamp: "2020-10-31T11:00:00Z",
    });
    expect(transaction.body).toBe(
      "Transaction with UNILEVER completed successfully."
    );
    expect(transaction.statusCode).toBe(200);
  });
});

describe("third POST /add", function () {
  test("add 3rd points", async () => {
    const transaction = await request(app).post("/add").send({
      payer: "DANNON",
      points: -200,
      timestamp: "2020-10-31T15:00:00Z",
    });
    expect(transaction.body).toBe(
      "Transaction with DANNON completed successfully."
    );
    expect(transaction.statusCode).toBe(200);
  });
});

describe("fourth POST /add", function () {
  test("add 4th points", async () => {
    transaction = await request(app).post("/add").send({
      payer: "MILLER COORS",
      points: 10000,
      timestamp: "2020-11-01T14:00:00Z",
    });
    expect(transaction.body).toBe(
      "Transaction with MILLER COORS completed successfully."
    );
    expect(transaction.statusCode).toBe(200);
  });
});

describe("fifth POST /add", function () {
  test("add 5th points", async () => {
    transaction = await request(app).post("/add").send({
      payer: "DANNON",
      points: 300,
      timestamp: "2020-10-31T10:00:00Z",
    });
    expect(transaction.body).toBe(
      "Transaction with DANNON completed successfully."
    );
    expect(transaction.statusCode).toBe(200);
  });
});

describe("DELETE /spend", function () {
  test("spend points", async () => {
    let spend = await request(app).delete("/spend").send({ points: 5000 });
    expect(spend.body).toStrictEqual([
      { payer: "DANNON", points: -100 },
      { payer: "UNILEVER", points: -200 },
      { payer: "MILLER COORS", points: -4700 },
    ]);
    expect(spend.statusCode).toBe(200);
  });
});

describe("GET /display", function () {
  test("display points", async () => {
    let display = await request(app).get("/display");

    expect(display.body).toEqual({
      DANNON: 1000,
      UNILEVER: 0,
      "MILLER COORS": 5300,
    });
    expect(display.statusCode).toBe(200);
  });
});
