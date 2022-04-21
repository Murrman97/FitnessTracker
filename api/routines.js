const express = require("express");
const routineRouter = express.Router();
const { getPublicRoutinesByUser } = require("../db");



module.exports = routineRouter