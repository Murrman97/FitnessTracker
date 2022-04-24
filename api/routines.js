const express = require("express");
const routineRouter = express.Router();
const { getAllRoutines, getAllPublicRoutines, createRoutine, getActivityById } = require("../db");
const{ loginAuth }= require("./utils")

routineRouter.use((req, res, next) => {
    console.log("A request is being made to /routines");
  
    next();
  });

  routineRouter.get("/", async (req, res) => {
    const routine = await getAllPublicRoutines();
  
    console.log(routine)
    res.send({
      routine
    });
  });

  // routineRouter.post(
  //   "/",
  //   loginAuth,
  //   async (req, res, next) => {
  //     const { isPublic, name, goal } = req.body  
  //     const id = req.params.routineId;
  //     try {
  //       const prevPlatform = await getActivityById(id);
  //       const nextRoutine = await getRoutineById(prevPlatform.platformId);
  //       if (req.user.id != nextRoutine.creatorId) {
  //         res.status(500).send(err);
  //       }
  //       const platformGame = await createRoutine({id,isPublic, name, goal});
  //       res.send(platformGame);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
  // );
  

  // routineRouter.patch("/routineId" ,loginAuth, async(req, res, next)=>{

  // })
  // routineRouter.delete("/:routineId",loginAuth, async (req, res, next)=>{

  // })

  // routineRouter.post("/:routineId/activities",async (req, res, next)=>{

  // })
module.exports = routineRouter