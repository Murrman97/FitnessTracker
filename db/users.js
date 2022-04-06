const client = require("./client");

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING username;
        `,
      [username, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

// async function getUser({ username, password }) {
//     try {

//     } catch (error) {
//         throw error;
//     }
// }

async function getUserById(id) {
  try {
    const { rows } = await client.query(`
        SELECT username, id FROM users
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows } = await client.query(`
        SELECT username FROM users
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
};
