const express = require("express");
const usersRouter = express.Router();
const { createUser, getUserByUsername } = require("../db")
const jwt = require("jsonwebtoken");

console.log( getUserByUsername)
usersRouter.post("/register", async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password, "Line8 Users !!!!!")
    try {
      const _user = await getUserByUsername(username);
        console.log(_user, "USER !!!!")
      if (_user) {
        next({
          name: "UserExistsError",
          message: "A user by that username already exists",
        });
      }
  
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
  
      res.send({
        message: "thank you for signing up",
        token,
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });


module.exports = usersRouter;