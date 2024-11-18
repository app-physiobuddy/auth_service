

class AuthController {
    constructor(authUseCases, authPresenter) {
      this.authUseCases = authUseCases;
      this.authPresenter = authPresenter;
    }
  
    async login(req, res) {
      try {
        const { email, password } = req.body;


        if (!email || !password) {
          return res.status(400).json({
            error: 'Missing required fields'
          });
        }
  
        const result = await this.authUseCases.loginUser(email, password);
        const rrr = res.status(200).json(
          result
        );
        console.log("ppas")
  
      } catch (error) {
        console.log("auth controller error", error)
        return "auth controller error"
        return res.status(500).json({
          error: 'Internal server error'
        });
      }
    }
    async register(req, res) {
        try {
            // this has to be email, password, name, role
          console.log("controler req.body", req.body)
          const result = await this.authUseCases.register(req.body);
          return res.status(201).json(
            "ok"
          );
        } catch (error) {
          console.log("AuthController error", error)

          return res.status(500).json({
            error: 'Internal server error'
          });
        }
      }
}

module.exports = AuthController