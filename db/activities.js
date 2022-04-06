const client = require("./client");

async function createActivity({ name, description = [] }) {
  try {
    const {
      rows: [activities],
    } = await client.query(
      `
        INSERT INTO activities(name, description) 
        VALUES ($1, $2)
        RETURNING *;
        `,
      [name, description]
    );
    return activities;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  try {
    const { rows: activitiesIds } = await client.query(`
            SELECT id
            FROM activities;
          `);

    return activitiesIds;
  } catch (error) {
    throw error;
  }
}

async function getActivityById(id) {
  try {
    const {
      rows: [activities],
    } = await client.query(
      `
        SELECT *
        FROM activities
        WHERE id=$1
        `,
      [activitiesIds]
    );
    return activities;
  } catch (error) {
    throw error;
  }
}
async function updateActivity(id, name, description = {}) {}

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
};
