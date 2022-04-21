// create the express server here
const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const app = express();
const {PORT = 3000} = process.env;

app.use(cors());
app.use(morgan('dev'));

require("dotenv").config()
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const apiRouter = require("./api");
app.use("/api", apiRouter);

// app.get();

// app.get("/products/:id", function (req, res, next) {
//   res.json({ msg: "This is CORS-enabled for all origins!" });
// });

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
