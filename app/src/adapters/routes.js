const express = require('express');
const authRouter = express.Router();




// Auth Dependencies
const AuthRepositoryPostgres = require("../framework/repositories/AuthRepositoryPostgres")
const AuthUseCases = require("../use-cases/auth-use-cases")
const AuthController = require("../adapters/AuthController")
const AuthProvider = require("../framework/providers/AuthProvider")
const emailProvider = require("../framework/providers/emailProvider")

// Auth Dep Injection
const authProvider = new AuthProvider();
authProvider.initialize();
const authRepository = new AuthRepositoryPostgres();
const authUseCases = new AuthUseCases(authRepository, authProvider, emailProvider);
const authController = new AuthController(authUseCases);





// Fn to catch sync and async errors
const asyncHandler = (controller) => (req, res, next) => {
  console.log("asyncHandler")
  Promise.resolve(controller(req, res, next)).catch(next);
}



// AUTH ROUTES
authRouter.get("/", (req, res) => {
  res.send("App is running;");
});

authRouter.post('/register', asyncHandler((req, res) => 
  authController.register(req, res)
));

authRouter.post('/login', asyncHandler((req, res) => 
  authController.login(req, res)
));

//Para admin
authRouter.get('/user/all', asyncHandler((req, res) => 
  authController.getAll(req, res)
));

authRouter.post('/user/changePassword', asyncHandler((req, res) => 
    authController.changePassword(req, res)
));
authRouter.post('/user/recoverPassword/*', asyncHandler((req, res) => {
  const [email, recoveryToken] = req.params[0].split("+")
  if (!email || !recoveryToken) {
    return authController.generateRecoveryToken(req, res)
  } else {

    return authController.implementRecoveryPassword(email, recoveryToken, req, res)
  }
}));

authRouter.get('/user/:userId', asyncHandler((req, res) => 
  //works for id and for email (logic on the usecase)
    authController.getUser(req, res)
));


authRouter.put('/user/details', asyncHandler((req, res) => 
  authController.editUser(req, res)
));



module.exports = {authRouter}

