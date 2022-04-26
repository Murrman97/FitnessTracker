const express = require("express");
const routineRouter = express.Router();
const { getAllRoutines, getAllPublicRoutines, createRoutine, getActivityById, getUserById, getRoutineById, destroyRoutine, getRoutineActivitiesByRoutine, addActivityToRoutine } = require("../db");
const{ loginAuth }= require("./utils")

routineRouter.use((req, res, next) => {
    console.log("A request is being made to /routines");
  
    next();
  });

  routineRouter.get("/", async (req, res) => {
    const routine = await getAllPublicRoutines();
  
    console.log(routine)
    res.send(
      routine
    );
  });

  routineRouter.post(
    "/",
    loginAuth,
    async (req, res, next) => {
      const { isPublic, name, goal } = req.body  
      const { id }= req.user;
      const routine = { creatorId, isPublic, name, goal }
      try {
          
    const newRoutine = await createRoutine(routine);
    
        res.send(newRoutine);
      } catch (error) {
        throw error;
      }
    });
  

  routineRouter.patch("/:routineId" ,loginAuth, async(req, res, next)=>{
const id = req.params.routineId 
const { isPublic, name, goal }= req.body
try{
const updatedRoutine = await updatedRoutine({ id, isPublic, name, description })
res.send(updatedRoutine)
}catch(error){
    throw(error)
}
  })
  routineRouter.delete("/:routineId",loginAuth, async (req, res, next)=>{
const routineId = req.params
try{
    const deleteRoutine = await destroyRoutine(routineId)
    res.send(deleteRoutine);
} catch(error){
    throw(error)
}})

//   routineRouter.post("/:routineId/activities",loginAuth, async (req, res, next)=>{
//       const { isPublic, name, goal }
// const routineId = req.params
// try{
//     const check = await getRoutineActivitiesByRoutine(routineId)
//     if(check.creatorId === req.user.id){
//         const activity = await addActivityToRoutine()
//     }
// }
//   })
module.exports = routineRouter