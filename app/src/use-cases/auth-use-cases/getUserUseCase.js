const ErrorTypes = require("../../utilities/errors/ErrorTypes")

function isEmail(param) {
    if (typeof param !== 'string') {
        return false;
    }
    return param.includes('@');
}
const getUserUseCase = ( authRepository, authProvider ) => {
    return async (userId) => {
        console.log(userId)
        if (isEmail(userId)) {
            const result_user = await authRepository.findByEmail(userId);
            if (!result_user) {
              throw ErrorTypes.UnauthorizedAcess('User not found in db');
            }
            return result_user
        }
    
        const result_user = await authRepository.findByUserId(userId);
        if (!result_user) {
            throw ErrorTypes.UnauthorizedAcess('User not found in db');
            }

        return result_user
 



    }}

module.exports = getUserUseCase