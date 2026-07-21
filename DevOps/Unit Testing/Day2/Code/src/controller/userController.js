/**
 * userController.js
 * Orchestration layer — ties together service calls.
 * In a real Express app, this would handle HTTP req/res.
 * Here we keep it framework-free so it's easy to test without a server.
 */

// const {
//   // registerUser,
//   getUserProfile,
//   removeUser,
// } = require("../service/userService");
const db = require("../db/db");
const { sendWelcomeEmail } = require("../service/emailService");
/**
 * Handle a registration request.
 * Returns { success, user } or throws on failure.
 */
// async function handleRegister(userData) {
//   const user = await registerUser(userData);
//   return { success: true, user };
// }

async function registerUser(userData) {
  const user = await db.save(userData);
  await sendWelcomeEmail(userData.email); // ← we want to mock this
  return user;
}
/**
 * Handle a get-profile request.
 * Returns { success, profile } or throws on failure.
 */
// async function handleGetProfile(userId) {
//   const profile = await getUserProfile(userId);
//   return { success: true, profile };
// }

// /**
//  * Handle a delete-user request.
//  * Returns { success } or throws on failure.
//  */
// async function handleDeleteUser(userId) {
//   await removeUser(userId);
//   return { success: true };
// }

module.exports = {
  registerUser,
  // handleRegister,
  // handleGetProfile,
  // handleDeleteUser,
};
