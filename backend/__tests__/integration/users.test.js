const request = require("supertest");
const Message = require("../../db/models/Message");

jest.mock("../../db/connection");
jest.mock("../../db/models/Message");

const app = require("../../app");

describe("Users API - Integration Tests", () => {
  it("should create a message", async () => {
    const mockMessage = {
      _id: "123",
      name: "Test",
      message: "Hello World",
      createdAt: new Date(),
    };

    Message.create.mockResolvedValue(mockMessage);

    const response = await request(app)
      .post("/users/new-message")
      .send({
        name: "Test",
        message: "Hello World",
      })
      .expect(201);

    expect(response.body.success).toBe(true);
  });

  it("should get messages", async () => {
    const mockMessages = [
      {
        _id: "1",
        name: "Test",
        message: "Hello",
        createdAt: new Date(),
      },
    ];

    Message.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockMessages),
    });

    const response = await request(app).get("/users/messages").expect(200);

    expect(response.body.success).toBe(true);
  });
});
