const express = require('express');
const router = express.Router();



const authRoutes = (authController) => {


  router.post('/register', (req, res) => {
    authController.register(req, res);
    });


  router.post('/login', (req, res) => {
    authController.login(req, res);
  });

  return router;
};

module.exports = authRoutes