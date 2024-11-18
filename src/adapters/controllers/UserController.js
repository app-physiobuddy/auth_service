
class UserController {
  constructor(userUseCases, userPresenter) {
    this.userUseCases = userUseCases;
    this.userPresenter = userPresenter;
  }

  async getAll(req, res) {
    // Calls use case and gets processed entities
    const userEntities = await this.userUseCases.getAll()
    console.log("UserController entities",userEntities)
    // Passes entities to presenter and gets formatted data
    const presentedData = this.userPresenter.present(userEntities);
    // Returns formatted data in response
    //console.log(presentedData)
    res.json(presentedData);
  }
}

  module.exports = {
    UserController
  };