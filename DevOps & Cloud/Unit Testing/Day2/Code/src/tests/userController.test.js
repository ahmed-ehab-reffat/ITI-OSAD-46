jest.mock("../service/emailService");
jest.mock("../db/db");
const { registerUser } = require("../controller/userController");
const { sendWelcomeEmail } = require("../service/emailService");
const db = require("../db/db");


  beforeEach(() => {

    jest.clearAllMocks();

  });
describe("registerUser", () => {
  it("saves the user and sends a welcome email", async () => {
    await registerUser({ name: "Sara", email: "sara@test.com" });

    // Was sendWelcomeEmail called?
    expect(sendWelcomeEmail).toHaveBeenCalledTimes(1);

    // Was it called with the right email?
    expect(sendWelcomeEmail).toHaveBeenCalledWith("sara@test.com");
  });
  test("does not send email if registration fails", async () => {
    db.save.mockRejectedValueOnce(new Error("DB error"));

    await expect(
      registerUser({ name: "X", email: "x@test.com" }),
    ).rejects.toThrow("DB error");

    expect(sendWelcomeEmail).not.toHaveBeenCalled();
  });
});
