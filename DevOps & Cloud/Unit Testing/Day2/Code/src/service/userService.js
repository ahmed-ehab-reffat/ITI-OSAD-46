/**
 * userService.js
 * Business logic layer.
 * Calls the repository (DB layer) and the email service.
 * This is the layer we unit test — we mock both the repo and email service.
 */

const repo = require("../repository/userRepository");
const { sendWelcomeEmail } = require("../service/emailService");
const User = require("../models/User");

/**
 * Get a public user profile by id.
 * Strips sensitive fields (e.g. password) before returning.
 * Throws if the user does not exist.
 */
async function getUserProfile(id) {
  // const user = await repo.findUserById(id);
  const user = await User.findById(id).lean();

  if (!user) throw new Error("User not found");

  // Return only safe public fields — never expose everything from DB
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Register a new user.
 * Checks for duplicate email, saves the user, then sends a welcome email.
 * Throws if email already in use.
 */
async function registerUser(userData) {
  const existing = await repo.findUserByEmail(userData.email);
  if (existing) throw new Error("Email already in use");

  const user = await repo.saveUser({
    name: userData.name,
    email: userData.email,
    role: "viewer",
  });

  // Send welcome email — we mock this in tests so no real email fires
  await sendWelcomeEmail(user.email);

  return user;
}

/**
 * Delete a user by id.
 * Throws if the user does not exist.
 */
async function removeUser(id) {
  const deleted = await repo.deleteUser(id);
  if (!deleted) throw new Error("User not found");
  return { success: true };
}

module.exports = {
  getUserProfile,
  registerUser,
  removeUser,
};
