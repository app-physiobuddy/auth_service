const PostgresDatabase = require("./external/config/dbconfig")

// Auth Dependiencies
const AuthRepositoryPostgres = require("./external/repositories/postgresAuthRepositories")
//const AuthPresenter = require("../adapters/presenters")
const AuthUseCases = require("./use-cases/auth-use-cases")
const AuthController = require("./adapters/controllers/AuthController")
const AuthProvider = require("./external/providers/AuthProvider")

const database = new PostgresDatabase();

function fakePresenter() {
  return function (arg) {
      return arg;
  }
}



// Auth Dep Injection
const authProvider = new AuthProvider();
authProvider.initialize();
const authRepository = new AuthRepositoryPostgres(database);
const authUseCases = new AuthUseCases(authRepository, authProvider);
const authPresenter = fakePresenter();
const authController = new AuthController(authUseCases, authPresenter);




const express = require('express');
const authRoutes = require('./external/routes/authRoutes');
const erroHandler = require("./utilities/errors/errorHandler")
const app = express();


const PORT = process.env.PORT || 3000;

// Middleware and other setup
app.use(express.json());



// Mount the routes
app.use('/auth', authRoutes(authController));

// express specific error handling middleware
app.use(erroHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

