const express = require("express");
const res = require("express/lib/response");
const activitiesRouter = express.Router();
const { getPublicRoutinesByUser, getAllActivities } = require("../db");

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

module.exports = activitiesRouter;
