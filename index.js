// create the express server here
const express = require("express");
const server = express();

server.use(express.json());

const PORT = 3000;

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
