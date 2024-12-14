const {User} = require("../../entities/User")
const ErrorTypes = require("../../utilities/errors/ErrorTypes")


const loginUseCase = (authRepository, authService) => {
    return async (email_raw, password_raw) => {
      const email = email_raw
      const password = password_raw;

      const _result_user = await authRepository.findByEmail(email);
      if (!_result_user) {
        throw ErrorTypes.UnauthorizedAcess('User not found in db');
      }
      console.log("LoginUseCase", _result_user)

      const user = new User(_result_user.email, _result_user.name, _result_user.password, _result_user.role)
      const userSalt = _result_user.salt

      const isValidPassword = await authService.verifyPassword(
        password,
        user.password,
        userSalt
      );

      const token = await authService.generateToken({
        id:_result_user.id,
        email: user.email,
        name: user.name,
        role: user.role
      });

    return {
        id:_result_user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        token: token
    };
  };
}

module.exports = loginUseCase