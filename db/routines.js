const client = require("./client");
const { attachActivitiesToRoutines } = require("./activities");
const { getUserByUsername } = require("./users");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows
    } = await client.query(
      `
          INSERT INTO routines("creatorId", "isPublic", name, goal) 
          VALUES ($1, $2, $3, $4)
          RETURNING *;
          `,
      [creatorId, isPublic, name, goal]
    );

    return rows;
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
      console.log(rA1,"Routines !!!!!")
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
    const{  rows: routines }= await client.query(`
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
    const {
      rows: [routines],
    } = await client.query(
      `
    SELECT *
    FROM routines
    WHERE id= $1
  `,
      [id]
    );
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

async function updateRoutine({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }
  const {
    rows: [routine],
  } = await client.query(
    `
      UPDATE routines
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
    Object.values(fields)
  );
  return routine;
}

async function destroyRoutine(id) {
  await client.query(
    `
  DELETE FROM routine_activities
  WHERE routine_activities."routineId" = $1
`,
    [id]
  );
  await client.query(
    `
    DELETE FROM routines
    WHERE id = $1
  `,
    [id]
  );
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
  destroyRoutine,
};
