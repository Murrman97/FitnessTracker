const express = require("express");
const usersRouter = express.Router();
const { createUser, getUserByUsername, getUser, getPublicRoutinesByUser } = require("../db");
const jwt = require("jsonwebtoken");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

usersRouter.get("/", async (req, res) => {
  const users = await getUser();

  res.send({
    users,
  });
});

usersRouter.post("/register", async (req, res, next) => {
  // console.log("HELLOOOO WORLD ")
  const { username, password } = req.body;
 
   try {
    
     const getUserName = await getUserByUsername(username);
     if (!getUserName) {
       const user = await createUser({
         username,
         password,
        });
        const token = jwt.sign(
          {
            id: user.id,
            username,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1w",
          }
          );
          console.log("USER!!!!!", user);
          res.send({
            user,
            message: "you're signed up!",
         token,
       });
      }else if (
        next({
          name:"password is too short",
          message:"password is too short"
        })
      ){
      }
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
       });
      
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    console.log(getUserByUsername())
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      // create token & return to user
      const token = jwt.sign(
        { id: user.id, username: username },
        process.env.JWT_SECRET
      );
      res.send({ user,message: "you're logged in!", token: token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
module.exports = usersRouter;
