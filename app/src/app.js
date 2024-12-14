require('dotenv').config();
const express = require('express');
const {authRouter} = require('./adapters/routes');
const erroHandler = require("./utilities/errors/errorHandler")

const app = express();



// Middleware and other setup
app.use(express.json());


app.route('/').get((req, res) => {
  res.send("Auth service is running");
})
// Mount the routes
app.use('/auth', authRouter);


// express specific error handling middleware
app.use(erroHandler);


const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});

