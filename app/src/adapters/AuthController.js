const ErrorTypes = require("../utilities/errors/ErrorTypes");


class AuthController {
    constructor(authUseCases) {
      this.authUseCases = authUseCases;
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
          {
            sucess: true,
            message: "User logged in successfully",
            token: result.token
          }
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
          {
            sucess: result,
            message: "User registered successfully"
          }
          );
      }
    
      async getAll(req, res) {

        const userEntities = await this.authUseCases.getAll()

        //To present data
        let makeMessage = userEntities.map(element => `User '${element.name}'`).join(" // ");
        let message = `We have ${userEntities.length} users registered in the app: ${makeMessage}`;

        return res.status(200).json(
          message
        );
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
          {
            sucess: result,
            message: "Password changed successfully"
          }
        );
      }
}

module.exports = AuthController