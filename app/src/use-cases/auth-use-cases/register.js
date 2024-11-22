
const {User} = require("../../entities/User");
const ErrorTypes = require("../../utilities/errors/errorTypes");

const registerUseCase = (authRepository, authService) => {
  return async (_User) => {
       
    let email = _User.email
    let newPassword = _User.password

    const existingUser = await authRepository.findByEmail(email);
    if (existingUser) {
      throw ErrorTypes.ConflictError('User already exists');
    }
    
    const {hashedPassword, salt} = await authService.hashPassword(newPassword);

    const user = new User(
      _User.email,
      _User.name,
      hashedPassword,
      _User.role
    );

    const savedUser = await authRepository.save(user, salt);

    return true
    };
  };

  module.exports = registerUseCase