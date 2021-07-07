// Import Express and external middleware
const express = require('express');
const helmet = require("helmet");

// Import specific Routers
const projectRouter = require("./projects/projectRouter"); 
const actionRouter = require("./actions/actionRouter"); 

// Create server
const server = express();

// Use global middleware 
server.use(helmet());
server.use(express.json());
server.use(logger);

// Specify general endpoints
server.get('/', (req, res) => {
  res.send(`<h2>This is for "Build a Web API" sprint </h2>`);
});

// Use specific Routers
server.use("/projs", projectRouter); 
server.use("/acts", actionRouter); 

server.use(defaultResponse);

//custom middleware
function logger(req, res, next) {
  console.log(`[${new Date().toString()}] ${req.method} ${req.originalUrl}`);
  next();
}

function defaultResponse(req,res) {
  res.status(404).json(`<h2>You have used an unsupported URL</h2>`)
}

module.exports = server;