
const {User} = require("../../entities/User")

const registerUseCase = ( authRepository, authService ) => {
  return async (_User) => {
    try {
        const newUser = new User(_User.email, _User.name, _User.password, _User.role)

        let email = newUser.email
        email = String(email).toLowerCase();

        const existingUser = await authRepository.findByEmail(email);
        if (existingUser) {
          console.log('Email already registered');
          return false
        }
        let newUserPassword = String(newUser.password)
        const hashedPassword = await authService.hashPassword(newUserPassword);

        const user = new User(
            newUser.email,
            newUser.name,
            hashedPassword,
            newUser.role
        );
  
        const savedUser = await authRepository.save(user);
        if (savedUser) {
          return true
        }
        
      } catch (error) {
        console.log("Register error: ", error)
        return false
      }
    };
  };

  module.exports = registerUseCase