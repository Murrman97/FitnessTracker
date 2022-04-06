const client = require("./client");
const { attachActivitiesToRoutines } = require("./activities");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
          INSERT INTO routines("creatorId", "isPublic", name, goal) 
          VALUES ($1, $2, $3, $4)
          RETURNING *;
          `,
      [creatorId, isPublic, name, goal]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(`
        SELECT *
        FROM routines
        JOIN users 
         username AS "creatorName"
      `);
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(`
        SELECT username 
        FROM routines
        `);
        return attachActivitiesToRoutines(routines)
  } catch (error) {
    throw error;
  }
}

 async function getAllPublicRoutines(){
  try {
    const { rows: routines } = await client.query(`
        SELECT *
        FROM routines
        WHERE "isPublic" = true 
      `);
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
 }

 async function getRoutineById(id){
  try{
    const { rows: routines } = await client.query(`
    SELECT *
    FROM routines
    WHERE id=${id} 
  `);
  return routines;
  } catch(error) {
      throw error;
  }
 }

async function getRoutinesWithoutActivities(){
  try {
    const { rows: routines } = await client.query(`
        SELECT *
        FROM routines
      `);
    return routines;
  } catch (error) {
    throw error;
  }
}

 async function getPublicRoutinesByActivity({ id }){

 }

 async function getPublicRoutinesByUser({ username }){
  try {
    const { rows: routines } = await client.query(`
        SELECT *
        FROM routines
        WHERE "isPublic" = true 
      `);
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
 }

 async function updateRoutine({ id, isPublic, name, goal }){

 }

 async function destroyRoutine(id){

 }

module.exports = {
  createRoutine,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllRoutinesByUser,
  getAllPublicRoutines,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  getRoutineById,
  updateRoutine,
  destroyRoutine
};
