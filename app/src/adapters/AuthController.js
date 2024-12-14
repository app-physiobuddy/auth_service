const ErrorTypes = require("../utilities/errors/ErrorTypes");
const validationSanatize = require("./helpers/validationSanatize")
const makeUrl = require("./helpers/makeUrl");

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
            id: result.id,
            token: result.token
          }
        );
    }
    async register(req, res) {

            // this has to be email, password, name, role (optional, default to user)
          let { email, password, name, role } = req.body;
          console.log(email, password, name, role)
          if (!email || !password || !name) {
            throw ErrorTypes.ValidationError('Email, password and name are required');
          }
          if (role) {role = String(role)}

          const isValidEmail = validationSanatize(email).emailValidation()
          if (!isValidEmail) {
            throw ErrorTypes.ValidationError('Email is not valid');
          }
          email = validationSanatize(email).emailSanitize();
          password = validationSanatize(password).passwordSanitize()
          name = validationSanatize(name).textSanitize()
 

          const newUser = {
            role : role || "user",
            email : email,
            name : name,
            password : password
          }

          const result = await this.authUseCases.registerUser(newUser);

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


      
      let {oldPassword, newPassword, email} = req.body;
      if (!oldPassword || !newPassword || !email) {
        throw ErrorTypes.ValidationError('Old password and new password and email are required');
      }

      oldPassword = String(oldPassword)
      newPassword = String(newPassword)
      email = String(email)

      const result = await this.authUseCases.changePassword(email, oldPassword, newPassword);

      return res.status(200).json(
        {
          sucess: result,
          message: "Password changed successfully"
        }
      );
    }
      
    async generateRecoveryToken(req, res) {
      // get email from body
      let email = req.body.email;
      console.log("Controller begin",email)
      const isValidEmail = validationSanatize(email).emailValidation()
      console.log(isValidEmail)

      email = validationSanatize(email).emailSanitize();
      console.log(email)
      
      // send email to user-case
     // const urlMaker = makeUrl(req)
      const randomPassword = await this.authUseCases.recoverPassword({userEmail: email, url: req.body.url});

      // link with a new generated password on url (i.e., um token) (saves on db as new password)
      // then the flow is the same as changePassword (logs in with new password and changes it afterwards)

      return res.status(200).json(
        {
          sucess: true,
          message: "Password recovered successfully",
          password: randomPassword
        });

      }//

    async implementRecoveryPassword(email, recoveryToken, req, res) {
      let newPassword = req.body.newPassword;

      const isValidEmail = validationSanatize(email).emailSanitize()
      if (!isValidEmail) {
        throw ErrorTypes.ValidationError('Email is not valid');
      }
      email = validationSanatize(email).emailSanitize();

      newPassword = validationSanatize(newPassword).passwordSanitize();

      const result = await this.authUseCases.implementRecovery(email, recoveryToken, newPassword);

      return res.status(200).json({
        sucess: Boolean(result),
        message: result ? "Password changed successfully" : "Error updating password"
      })
    }
    async getUser(req, res) {
      let { userId } = req.params;
      console.log(userId)

      

      if (!userId) {
        throw ErrorTypes.ValidationError('userId or email is required');
      }
  
      const resultUser = await this.authUseCases.getUser(userId)

      return res.status(200).json({
        sucess: Boolean(resultUser),
        message: {name:resultUser.name, email:resultUser.email, id:resultUser.id, role:resultUser.role}
      });
    }
    async editUser(req, res) {
      const token = req.headers['token'];
      if (!token) {
        throw ErrorTypes.ValidationError('Token is required');
      }
      if (!req.body.name && !req.body.email) {
        throw ErrorTypes.ValidationError('Name and/or email is required');
      }
      let email;
      let name;
      if (req.body.name) {name = req.body.name}
      if (req.body.email) {email = req.body.email}

      const user = {email:email, name:name}
      console.log(user)

      let result = await this.authUseCases.editUser(token, user)

      return res.status(200).json({
        sucess: Boolean(result),
        message: result ? "Changes successfully updated" : "Error updating user",
      })
    }
}

module.exports = AuthController