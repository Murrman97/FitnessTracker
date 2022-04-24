const express = require("express");
const { getActivityById, getRoutineActivityById, updateRoutineActivity, destroyRoutineActivity, getRoutineById } = require("../db");
const routine_activitiesRouter = express.Router();
const { loginAuth } = require("./utils")

routine_activitiesRouter.use((req, res, next) => {
    console.log("A request is being made to /routines");
  
    next();
  });
  routine_activitiesRouter.get("/",async (req, res, next) => {
  
  })
  routine_activitiesRouter.patch(()=>{
      "/:routineActivityId",
      loginAuth,
      async (req, res, next) => {
        const { count, duration } = req.body;
        const id = req.params.routine_activitiesId;
        try {
          const prevRoutine = await getRoutineActivityById(id);
          const nextRoutine = await getRoutineById(prevRoutine.routineId);
          if (req.user.id != nextRoutine.creatorId) {
            res.status(500).send(err);
          } else {
            const routineActivity = await updateRoutineActivity({
              id,
              count,
              duration,
            });
            res.send(routineActivity);
          }
        } catch (error) {
          next(error);
        }
      }
  })
  routine_activitiesRouter.delete(()=>{
      "/:routine_activitiesId",
      loginAuth,
      async (req, res, next) => {
        const id = req.params.routine_activitiesId;
        try {
          const prevRoutine = await getRoutineActivityById(id);
          const nextRoutine = await getRoutineById(prevRoutine.activityId);
          if (req.user.id != nextRoutine.creatorId) {
            res.status(500).send(err);
          }
          const routineActivity = await destroyRoutineActivity(id);
          res.send(routineActivity);
        } catch (error) {
          next(error);
        }
      }
  })

module.exports = routine_activitiesRouter