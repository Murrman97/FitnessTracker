const client = require("./client");

async function addActivityById(id) {}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {

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