const {
  postMessage,
  getMessages,
} = require("../../controllers/userController");
const Message = require("../../db/models/Message");

jest.mock("../../db/models/Message");

describe("userController - Unit Tests", () => {
  it("should create a message", async () => {
    const mockMessage = {
      _id: "123",
      name: "Test",
      message: "Hello",
      createdAt: new Date(),
    };

    Message.create.mockResolvedValue(mockMessage);

    const result = await postMessage({
      name: "Test",
      message: "Hello",
    });

    expect(result.success).toBe(true);
  });

  it("should get messages", async () => {
    const mockMessages = [
      { _id: "1", name: "Test", message: "Hello", createdAt: new Date() },
    ];

    Message.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockMessages),
    });

    const result = await getMessages();

    expect(result.success).toBe(true);
  });
});
