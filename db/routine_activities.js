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
          `, [routineId, activityId, count, duration])
        return routineActivities;
    }catch (error){
    throw error
    }
}
async function updateRoutineActivity({ id, count, duration }){

}

async function destroyRoutineActivity(id){

}

module.exports = {
    addActivityById,
    addActivityToRoutine,
    updateRoutineActivity,
    destroyRoutineActivity
}