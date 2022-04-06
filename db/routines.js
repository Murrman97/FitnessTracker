const client = require("./client");

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
    const {
      rows: [routines],
    } = await client.query(`
        SELECT *
        FROM routines
      `);
    return routines;
  } catch (error) {
    throw error;
  }
}

// async function getAllRoutinesByUser({ username })

// async function getAllPublicRoutines()

// async function getRoutineById(id)

// async function getRoutinesWithoutActivities()

// async function getPublicRoutinesByActivity({ id })

// async function getPublicRoutinesByUser({ username })

// async function updateRoutine({ id, isPublic, name, goal })

// async function destroyRoutine(id)

module.exports = {
  createRoutine,
};
