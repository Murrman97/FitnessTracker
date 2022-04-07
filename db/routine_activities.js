const client = require("./client");

async function getRoutineActivityById(id) {
  const {
    rows: [routineActivities],
  } = await client.query(`
      SELECT *
      FROM routine_activities
      WHERE id=${id} 
    `);
  return routineActivities;
}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const {
      rows: [routineActivities],
    } = await client.query(
      `
          INSERT INTO routine_activities("routineId", "activityId", count, duration) 
          VALUES ($1, $2, $3, $4)
          RETURNING *;
          `,
      [routineId, activityId, count, duration]
    );
    return routineActivities;
  } catch (error) {
    throw error;
  }
}
async function getRoutineActivitiesByRoutine({ id }) {
  const { rows } = await client.query(
    `
        SELECT * 
        FROM routine_activities
        WHERE "routineId" = $1
        `,
    [id]
  );

  return rows;
}

async function updateRoutineActivity({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }
  const {
    rows: [routineActivities],
  } = await client.query(
    `
      UPDATE routine_activities
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
    Object.values(fields)
  );
  return routineActivities;
}

async function destroyRoutineActivity(id) {
  const {
    rows: [routineActivity],
  } = await client.query(
    `
        DELETE FROM routine_activities
        WHERE id = $1
        RETURNING *
        
      `,
    [id]
  );
  return routineActivity;
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
};
