const express = require("express");
const routine_activitiesRouter = express.Router();

routine_activitiesRouter.use((req, res, next) => {
    console.log("A request is being made to /routines");
  
    next();
  });

  routine_activitiesRouter.get("/", async (req, res) => {
    const routine = await getAllRoutines();
  
    res.send({
      routine,
    });
  });

  routine_activitiesRouter.patch(()=>{

  })
  routine_activitiesRouter.delete(()=>{
      
  })

module.exports = routine_activitiesRouter