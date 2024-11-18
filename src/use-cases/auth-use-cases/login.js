const {User} = require("../../entities/User")

const loginUseCase = ( authRepository, authService ) => {
    return async (email_raw, password_raw) => {
      const email = String(email_raw).toLowerCase();
      const password = String(password_raw);
      try {
        const _result_user = await authRepository.findByEmail(email);

        
        if (!_result_user) {
          console.log("user not found in db")
          return "Login: User not found in db"
          throw  Error('Login Use Case: User not found');
        }
        const user = new User(_result_user.email, _result_user.name, _result_user.password, _result_user.role)
  
        const isValidPassword = await authService.comparePasswords(
          password,
          user.password
        );
        console.log("isValidPassword", isValidPassword)
        if (!isValidPassword) {
          console.log("invalid password")
          return "Login: Invalid password"
        }
  
        const token = await authService.generateToken({
          email: user.email,
          name: user.name,
          role: user.role
        });
        console.log("Login, user logged in")

        return { user, token };
        
      } catch (error) {
        return "Login error"
        console.log("Login error: ", error)
    };
  };
}

module.exports = loginUseCase