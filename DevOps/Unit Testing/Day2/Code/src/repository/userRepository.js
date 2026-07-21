/**
 * userRepository.js
 * The DB layer — all direct database access lives here.
 * The service layer calls this. Tests mock this module to avoid hitting a real DB.
 *
 * Pattern: Repository Pattern
 * → keeps DB logic separate from business logic
 * → makes it trivial to mock the DB in unit tests
 */

const db = require('../db/db');

/**
 * Find a user by their id.
 * Returns the user object, or null if not found.
 */
async function findUserById(id) {
  return db.findUserById(id);
}

/**
 * Find a user by their email address.
 * Returns the user object, or null if not found.
 */
async function findUserByEmail(email) {
  return db.findUserByEmail(email);
}

/**
 * Save a new user to the DB.
 * Returns the saved user with its generated id.
 */
async function saveUser(data) {
  return db.saveUser(data);
}

/**
 * Delete a user by id.
 * Returns true if deleted, false if not found.
 */
async function deleteUser(id) {
  return db.deleteUser(id);
}

module.exports = {
  findUserById,
  findUserByEmail,
  saveUser,
  deleteUser,
};