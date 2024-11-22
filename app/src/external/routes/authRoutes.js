const express = require('express');
const router = express.Router();
const logger = require("../providers/LogProvider");


// To catch sync and async errors
const asyncHandler = (controller) => (req, res, next) => {
  console.log("asyncHandler");
  Promise.resolve(controller(req, res, next)).catch(next);
}


const authRoutes = (authController) => {

  router.get("/", (req, res) => {
    res.send("App is running;");
  });

  router.post('/register', asyncHandler((req, res) => 
    authController.register(req, res)
  ));

  router.post('/login', asyncHandler((req, res) => 
    authController.login(req, res)
  ));

  router.get('/user/all', asyncHandler((req, res) => 
    authController.getAll(req, res)
  ));

  router.post('/user/changePassword', asyncHandler((req, res) => 
      authController.changePassword(req, res)
  ));

  router.get('/user/details', asyncHandler((req, res) => 
      authController.getAll(req, res)
  ));
  


  return router;
};

module.exports = authRoutes

