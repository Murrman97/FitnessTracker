const client = require("./client");
const { attachActivitiesToRoutines } = require("./activities");
const { getUserByUsername } = require("./users");

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
        SELECT routines.* , users.username AS "creatorName"
        FROM routines
        JOIN users 
        ON routines."creatorId" = users.id
      `);
    const rA = await attachActivitiesToRoutines(routines);
    const rA1 = rA[0].activities;
    //   console.log(rA1,"Routines !!!!!")
    return await attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  const user = await getUserByUsername(username);

  const { rows: routines } = await client.query(
    `
        SELECT routines.* , users.username AS "creatorName"
        FROM routines
        JOIN users
        ON routines."creatorId" = users.id
        WHERE users.id = $1
         
        `,
    [user.id]
  );
  return await attachActivitiesToRoutines(routines);
}

async function getAllPublicRoutines() {
  try {
    const { rows: routines } = await client.query(`
        SELECT routines.* , users.username AS "creatorName"
        FROM routines
        JOIN users 
        ON routines."creatorId" = users.id
        WHERE "isPublic" = true 
      `);
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getRoutineById(id) {
  try {
    const { rows: routines } = await client.query(`
    SELECT *
    FROM routines
    WHERE id=${id} 
  `);
    return routines;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
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

async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows: routines } = await client.query(`
        SELECT routines.* , users.username AS "creatorName"
        FROM routines
        JOIN users 
        ON routines."creatorId" = users.id
        WHERE "isPublic" = true 
      `);
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users
        ON routines."creatorId" = users.id
        WHERE "isPublic" = true 
      `);
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function updateRoutine({ id, isPublic, name, goal }) {}

async function destroyRoutine(id) {}

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
  destroyRoutine,
};
