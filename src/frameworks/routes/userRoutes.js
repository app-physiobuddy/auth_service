const express = require('express');
const router = express.Router();



const userRoutes = (userController) => {
  router.get("/", (req, res) => {
    res.send("Works better;");
  });

  router.get('/allusers', (req, res) => {
    userController.getAll(req, res);
  });

  router.post('/users', (req, res) => {
    const { name } = req.body;
    res.status(201).json({ id: 3, name });
  });



  return router;
};

module.exports = userRoutes