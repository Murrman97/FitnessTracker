// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./users");


apiRouter.get("/health", function (req, res, next) { 
    res.send({message:"it is healthy"})});

// apiRouter.get("/products/:id", function (req, res, next) {
//     res.json({ msg: "This is CORS-enabled for all origins!" });
//   });

apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
