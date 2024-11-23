require('dotenv').config();

// Auth Dependencies
const AuthRepositoryPostgres = require("./framework/repositories/AuthRepositoryPostgres")
const AuthUseCases = require("./use-cases/auth-use-cases")
const AuthController = require("./adapters/AuthController")
const AuthProvider = require("./framework/providers/AuthProvider")



// Auth Dep Injection
const authProvider = new AuthProvider();
authProvider.initialize();
const authRepository = new AuthRepositoryPostgres();
const authUseCases = new AuthUseCases(authRepository, authProvider);
const authController = new AuthController(authUseCases);

console.log(
  process.env.DB_HOST,
  process.env.DB_PORT,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_DATABASE,
  process.env.APP_PORT
)


const express = require('express');
const authRoutes = require('./framework/routes/authRoutes');
const erroHandler = require("./utilities/errors/errorHandler")
const app = express();



// Middleware and other setup
app.use(express.json());



// Mount the routes
app.use('/auth', authRoutes(authController));

// express specific error handling middleware
app.use(erroHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

