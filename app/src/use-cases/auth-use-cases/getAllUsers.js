const {User} = require("../../entities/User")
const ErrorTypes = require("../../utilities/errors/errorTypes")



const getAllUsersUseCase = (authRepository) => {

  return async () => {
    const rawUsers = await authRepository.readAll();

    const n_users = rawUsers.length
    let user_list = []
    for (let i = 0; i < n_users; i++) {
        let user = new User(rawUsers[i].email, rawUsers[i].name, rawUsers[i].password, rawUsers[i].role)
        user_list[i] = user
    }
  
  return user_list
  }

}  


module.exports = getAllUsersUseCase