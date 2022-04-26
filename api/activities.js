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
const { loginAuth } = require("./utils");

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

activitiesRouter.patch("./:activityId", loginAuth, async (req, res, next) => {
   const { name, description } = req.body;
   console.log(name, description)
  const id = req.params.activityId;
  try {
    const activity = await updateActivity({ id,name, description });
    console.log(activity)
    res.send(activity);
  } catch (error) {
    throw error;
  }
});

activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  const activityId = req.params;

  try {
    const activities = await getPublicRoutinesByActivity( activityId );
    res.send(
      activities
    )
  } catch (error) {
    throw error;
  }
});

module.exports = activitiesRouter;
