// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./users");
const routineRouter = require("./routines")
const activitiesRouter = require("./activities")


apiRouter.get("/health", function (req, res, next) {
  res.send({ message: "it is healthy" });
});

apiRouter.use("/users", usersRouter);

apiRouter.use("/activities", activitiesRouter);

module.exports = apiRouter;
