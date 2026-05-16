jest.mock("../repository/userRepository");

const { getUserProfile } = require("../service/userService");
const repo = require("../repository/userRepository");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/User");
let mongoServer;
// beforeEach(() => {
//   const user = {
//     id: 1,
//     name: "Alice",
//     email: "alice@test com",
//     password: "secret",
//     role: "admin",
//   };
//   repo.findUserById.mockResolvedValue(user);
// });

// ── Setup ──────────────────────────────────────────────────────────
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create(); // start in-memory instance
  await mongoose.connect(mongoServer.getUri()); // connect Mongoose to it
});

beforeEach(async () => {
  // Seed the DB with a test user
  await User.create({
    name: "Alice",
    email: "alice@test.com",
  });
});

afterEach(async () => {
  await User.deleteMany({}); // wipe between tests
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop(); // tear down the server
});

describe("getUserProfile", () => {
  it("returns a public profile for an existing user", async () => {
    const user = await User.findOne({ email: "alice@test.com" });

    // Act
    const profile = await getUserProfile(user._id);

    // Assert
    expect(profile.name).toBe("Alice");
    expect(profile.email).toBe("alice@test.com");
    expect(profile).not.toHaveProperty("role");

    // const id = 1;
    //     const profile = await getUserProfile(id);

    //     // Should return only public fields
    //     expect(profile).toEqual({
    //       id: 1,
    //       name: "Alice",
    //       email: "alice@test com",
    //     });
    //         // Should not include sensitive fields
    //     expect(profile).not.toHaveProperty("password");
    //     expect(profile).not.toHaveProperty("role");
    //     expect(repo.findUserById).toHaveBeenCalledTimes(1);
    //     expect(repo.findUserById).toHaveBeenCalledWith(id);
  });

 it("throws if the user does not exist", async () => {
      
    const fakeId = new mongoose.Types.ObjectId();
    await expect(getUserProfile(fakeId)).rejects.toThrow("User not found");
  });


  //   it("throws if the user does not exist", async () => {
  //     repo.findUserById.mockResolvedValue(null);

  //     await expect(getUserProfile(999)).rejects.toThrow("User not found");
  //   });
  test('throws on invalid id', async () => {
        const fakeId = new mongoose.Types.ObjectId();

  await expect(getUserProfile(fakeId)).rejects.toThrow('User not found');
});

// Option B — try / catch
test('throws on invalid id', async () => {
  try {
        const fakeId = new mongoose.Types.ObjectId();

    await getUserProfile(fakeId);
  } catch (err) {
    expect(err.message).toBe('User not found');
  }
});
});
