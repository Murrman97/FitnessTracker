const express = require("express");
const routineRouter = express.Router();
const { getAllRoutines, getAllPublicRoutines, createRoutine } = require("../db");
const loginAuth = require("./utils")

routineRouter.use((req, res, next) => {
    console.log("A request is being made to /routines");
  
    next();
  });

  routineRouter.get("/", async (req, res) => {
    const routine = await getAllRoutines();
  
    res.send({
      routine,
    });
  });
  routineRouter.get("/", async (req, res) => {
    const routine= await getAllPublicRoutines();
  
    res.send({
      routine
    });
  });

  routineRouter.post("/", async (req, res, next) => {

    const {creatorId, isPublic, name, goal  } = req.body;
  
    try {
      const newRoutine = await createRoutine({ creatorId, isPublic, name, goal });

      if(creatorId != creatorId){
          return null
      }
      res.send(newRoutine);
    } catch (error) {
      throw error;
    }
  });

module.exports = routineRouter