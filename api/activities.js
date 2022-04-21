const express = require("express");
const res = require("express/lib/response");
const activitiesRouter = express.Router();
const {
  getPublicRoutinesByUser,
  getAllActivities,
  createActivity,
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

module.exports = activitiesRouter;
