const express = require("express");
const usersRouter = express.Router();
const { createUser, getUserByUsername, getUser } = require("../db")
const jwt = require("jsonwebtoken");

console.log( getUserByUsername)
usersRouter.post("/register", async (req, res, next) => {
  console.log("HELLOOOO WORLD ")
    const { username, password } = req.body;
    console.log(username, password, "Line8 Users !!!!!")
    try {
      const _user = await getUserByUsername(username);
        console.log(_user, "USER !!!!")
      if (_user) {
        console.log("THERE IS ALREADY A USER")
        next({
          name: "UserExistsError",
          message: "A user by that username already exists",
        });
      }
      console.log("USER!!!!!")
      const user = await createUser({
        username,
        password,
      });
      console.log("USER!!!!!", user)
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
        user, message: "you're signed up!", token
      }
      );
    } catch ({ name, message }) {
      next({ name, message });
    }
  });


module.exports = usersRouter;