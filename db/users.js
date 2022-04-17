const client = require("./client");

async function createUser({ username, password }) {
  try {
     console.log("IN YOUR CREATE USER ", username, password)
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
    console.log(user)
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
    const {rows: [user]} = await client.query(`
    SELECT * from users
    `)
    delete user.password
    return user
}

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
// this function is the problem 
async function getUserByUsername(username) {
  try {
    const { rows: [user]} = await client.query(
      `
      SELECT * FROM users
      WHERE username = $1
      `,
      [username]
      );
      console.log(rows, "rows!!!!!")
    if (!rows || !rows.length) {
      return null;
    }
    
    console.log(user, "USERS!!!!")
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  getUser
};
