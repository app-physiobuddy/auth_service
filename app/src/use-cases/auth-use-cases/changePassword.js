const {User} = require("../../entities/User")
const ErrorTypes = require("../../utilities/errors/ErrorTypes")
const changePasswordUseCase = ( authRepository, authService ) => {
    return async (email, oldPassword_raw, newPassword_raw) => {





        const oldPassword = oldPassword_raw
        const newPassword = newPassword_raw

   
        const _result_user = await authRepository.findByEmail(email);

        const isOldPasswordValid = await authService.verifyPassword(
            oldPassword,
            _result_user.password,
            _result_user.salt
        )
        if (!isOldPasswordValid) {return false}
        const {hashedPassword, salt} = await authService.hashPassword(newPassword);

        const user = new User(_result_user.email, _result_user.name, hashedPassword, _result_user.role)

        await authRepository.updatePassword(user, salt);
            
            return true
    }
  }

module.exports = changePasswordUseCase