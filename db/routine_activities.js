const client = require("./client");

async function addActivityById(id) {}

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
        `,[id]
  );
  console.log(rows, "ROWS!!!!!!!!")
  return rows;
}

async function updateRoutineActivity({ id, count, duration }) {}

async function destroyRoutineActivity(id) {}

module.exports = {
  addActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
};
