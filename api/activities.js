const express = require("express");
const res = require("express/lib/response");
const activitiesRouter = express.Router();
const {
  getPublicRoutinesByUser,
  getAllActivities,
  createActivity,
  updateActivity,
  getPublicRoutinesByActivity,
} = require("../db");

activitiesRouter.use((req, res, next) => {
  console.log("A request is being made to /activities");

  next();
});

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();

    res.send(allActivities);
  } catch (error) {
    throw error;
  }
});

activitiesRouter.post("/", async (req, res, next) => {
  const { name, description } = req.body;

  try {
    const newActivity = await createActivity({ name, description });

    res.send(newActivity);
  } catch (error) {
    throw error;
  }
});

// activitiesRouter.patch("/:activityId", async (req, res, next) => {
//   const id = req.params.activityId;
//   const { name, description } = req.body;
//   try {
//     const activity = await updateActivity({ name, description });
//     res.send(activity);
//   } catch (error) {
//     throw error;
//   }
// });

activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  const activityId = req.params;

  try {
    const routines = await getPublicRoutinesByActivity({ id: activityId });
  } catch (error) {
    throw error;
  }
});

module.exports = activitiesRouter;
