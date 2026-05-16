/**
 * db.js
 * A simple in-memory database simulation.
 * In a real project this would be a connection to MySQL, PostgreSQL, MongoDB, etc.
 * We keep it simple here so the tests can focus on mocking — not DB setup.
 */

let connected = false;

// In-memory store — acts like a DB table
const store = {
  users: [
    { id: 1, name: "Sara Ahmed", email: "sara@example.com", role: "admin" },
    { id: 2, name: "Karim Nour", email: "karim@example.com", role: "viewer" },
    { id: 3, name: "Layla Hassan", email: "layla@example.com", role: "viewer" },
  ],
  nextId: 4,
};

const db = {
  /**
   * Simulate opening a DB connection.
   * In tests this will usually be mocked or called in beforeAll().
   */
  connect() {
    connected = true;
    console.log("[db] Connected");
  },

  /**
   * Simulate closing a DB connection.
   * Usually called in afterAll().
   */
  disconnect() {
    connected = false;
    console.log("[db] Disconnected");
  },

  isConnected() {
    return connected;
  },

  /**
   * Find a single user by id.
   * Returns the user object or null if not found.
   */
  findUserById(id) {
    return store.users.find((u) => u.id === id) || null;
  },

  /**
   * Find a user by email address.
   */
  findUserByEmail(email) {
    return store.users.find((u) => u.email === email) || null;
  },

  /**
   * Insert a new user and return it with its generated id.
   */
  saveUser(data) {
    const user = { id: store.nextId++, ...data };
    store.users.push(user);
    return user;
  },

  /**
   * Delete a user by id.
   * Returns true if deleted, false if not found.
   */
  deleteUser(id) {
    const index = store.users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    store.users.splice(index, 1);
    return true;
  },

  /**
   * Return all users — useful for debugging.
   */
  getAllUsers() {
    return [...store.users];
  },

  /**
   * Reset the store to its original state.
   * Useful in tests that modify data without mocking.
   */
  reset() {
    store.users = [
      { id: 1, name: "Sara Ahmed", email: "sara@example.com", role: "admin" },
      { id: 2, name: "Karim Nour", email: "karim@example.com", role: "viewer" },
      {
        id: 3,
        name: "Layla Hassan",
        email: "layla@example.com",
        role: "viewer",
      },
    ];
    store.nextId = 4;
  },
  save(data) {
    const user = { id: store.nextId++, ...data };
    store.users.push(user);
    return user;
  },
};

module.exports = db;
