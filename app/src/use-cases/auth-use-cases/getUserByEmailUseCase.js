const ErrorTypes = require("../../utilities/errors/ErrorTypes")
const getUserByEmailUseCase = ( authRepository, authProvider ) => {
    return async (userEmail) => {



        console.log(userEmail)

        const result_user = await authRepository.findByEmail(userEmail);
        if (!result_user) {
          throw ErrorTypes.UnauthorizedAcess('User not found in db');
        }
        return result_user




    }}

module.exports = getUserByEmailUseCase