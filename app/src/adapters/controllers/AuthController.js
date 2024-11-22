const ErrorTypes = require("../../utilities/errors/errorTypes");


class AuthController {
    constructor(authUseCases, authPresenter) {
      this.authUseCases = authUseCases;
      this.authPresenter = authPresenter;
    }
  
    async login(req, res) {

      let { email, password } = req.body;
        if (!email || !password) {
          throw ErrorTypes.ValidationError('Email and password are required');
        }
        
        email = String(email).toLowerCase();
        password = String(password);
        
        const result = await this.authUseCases.loginUser(email, password);

        return res.status(200).json(
          result
        );

  
    }
    async register(req, res) {

            // this has to be email, password, name, role (optional, default to user)
          let { email, password, name, role } = req.body;

          email = String(email).toLowerCase();
          password = String(password);
          name = String(name);
          if (role) {role = String(role)}
          if (!email || !password || !name) {
            throw ErrorTypes.ValidationError('Email, password and name are required. role is optional');
          }

          const newUser = {
            role : role || "user",
            email : email,
            name : name,
            password : password
          }

          const result = await this.authUseCases.register(newUser);

          return res.status(201).json(
            result
          );
      }
    
      async getAll(req, res) {
        const userEntities = await this.userUseCases.getAll()
        const presentedData = this.userPresenter.present(userEntities);

        res.json(presentedData);
      }

      async changePassword(req, res) {
        const token = req.headers['token'];
        if (!token) {
          throw ErrorTypes.ValidationError('Token is required');
       }
       
        let {oldPassword, newPassword} = req.body;
        if (!oldPassword || !newPassword) {
          throw ErrorTypes.ValidationError('Old password and new password are required');
        }

        oldPassword = String(oldPassword)
        newPassword = String(newPassword)

        const result = await this.authUseCases.changePassword(token, oldPassword, newPassword);

        return res.status(200).json(
          result
        );
      }
}

module.exports = AuthController