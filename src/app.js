const {PostgresDatabase} = require("./frameworks/config/dbconfig")

// User Dependecies
const {UserRepositoryPostgres} = require("./frameworks/repositories/postgresUserRepositories")
const {UserPresenter} = require("./adapters/presenters/UserPresenter")
const UserUseCases = require("./use-cases/user-use-cases")
const {UserController} = require("./adapters/controllers/UserController")

const database = new PostgresDatabase();
// Auth Dep Injection
const AuthFactory = require("./frameworks/factories/authFactory")
const authFactory = new AuthFactory(database);
const authController = authFactory.authController()

// User Dep Injection
const userRepository = new UserRepositoryPostgres(database);
const userUseCases = new UserUseCases(userRepository);
const userPresenter = new UserPresenter();
const userController = new UserController(userUseCases, userPresenter);







const express = require('express');
const authRoutes = require('./frameworks/routes/authRoutes');
const userRoutes = require('./frameworks/routes/userRoutes');
const app = express();


const PORT = process.env.PORT || 3000;

// Middleware and other setup
app.use(express.json());

// Mount the routes
app.use('/users', userRoutes(userController));
app.use('/auth', authRoutes(authController));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

