const express = require("express");
const usersRouter = express.Router();
const { createUser, getUserByUsername, getUser } = require("../db");
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
  // console.log(username, password, "Line8 Users !!!!!")
   try {
     console.log(getUserByUsername(), "GETUSER !!!!");
     const getUserName = await getUserByUsername(username);
     if (getUserName) {
       console.log("THERE IS ALREADY A USER");
       next({
         name: "UserExistsError",
         message: "A user by that username already exists",
        });
      }
      const user = await createUser({
        username,
        password,
      });
    console.log("USER!!!!!", user);
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
    res.send({
      user,
      message: "you're signed up!",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
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
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      // create token & return to user
      const token = jwt.sign(
        { id: user.id, username: username },
        process.env.JWT_SECRET
      );
      res.send({ message: "you're logged in!", token: token });
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
