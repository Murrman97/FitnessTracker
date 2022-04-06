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

async function updateActivity(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [activities],
    } = await client.query(
      `
            UPDATE activities
            SET ${setString}
            WHERE id=${id}
            RETURNING *
        `,
      Object.values(fields)
    );
    return activities;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
};
