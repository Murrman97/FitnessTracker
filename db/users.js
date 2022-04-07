const { rows } = require("pg/lib/defaults");
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
        RETURNING *
        `,
      [username, password]
    );
    delete user.password;
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
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE id=$1
        `,
      [id]
    );
    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows } = await client.query(
      `
        SELECT * FROM users
        WHERE username = $1
        `,
      [username]
    );
    if (!rows.length || !rows) {
      return null;
    }

    return rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
};
