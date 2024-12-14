const {User} = require("../../entities/User")
const ErrorTypes = require("../../utilities/errors/ErrorTypes")

function isTokenValid(createdAt, expiresAt) {
  // Parse the dates
  const created = new Date(createdAt);
  const expires = new Date(expiresAt);
  
  const diffMinutes = (expires - created) / (1000 * 60);
  
  return diffMinutes <= 10;
}


const recoverPasswordUseCase = (authRepository, authProvider, emailProvider) => {
    const generateRecoveryToken = async (info) => {
        let {userEmail, url} = info
        console.log(userEmail)
        let _result_user = await authRepository.findByEmail(userEmail);
        if (!_result_user) {
          throw ErrorTypes.UnauthorizedAcess('User not found in db');
        }
        console.log(_result_user)
        const randomPassword = Math.random().toString(36).slice(2);
        const {hashedPassword, salt} = await authProvider.hashPassword(randomPassword);
        
        _result_user.resetPasswordToken = hashedPassword

        await authRepository.updateRecoveryPasswordToken(_result_user, salt);
        console.log("What has saved to user_recovery table",_result_user.id, _result_user.resetPasswordToken, salt)

        const recoveryUrl = `${url}${userEmail}+${randomPassword}`

        ////////

        const subject = "Password Recovery";
        const text = `Your password is: ${randomPassword} `;
        const html = `<h3>Physio Buddy Password Recovery</h3> <p>Acess this url and enter a new password: ${recoveryUrl}</p> `
        await emailProvider(userEmail, subject, text, html).sendEmail();

        return randomPassword
    };

    const loginWithRecoveryToken = async (userEmail, recoveryToken, newPassword) => {
      console.log("loginWithRecoveryToken", userEmail, recoveryToken, newPassword)

      const _result_user = await authRepository.findByEmail(userEmail);
      if (!_result_user) {
        throw ErrorTypes.UnauthorizedAcess('User not found in db');
      }
      const userID = _result_user.id
      const _result_user_recovery = await authRepository.findByUserId(userID);
      if (!_result_user_recovery) {
        throw ErrorTypes.UnauthorizedAcess('User not found in db');
      }
      console.log(_result_user_recovery.reset_password_token)

      const isRecoveryValid = isTokenValid(_result_user_recovery.reset_password_token_created_at, _result_user_recovery.reset_password_token_expires_at)
      if (!isRecoveryValid) {
        throw ErrorTypes.UnauthorizedAcess('Recovery token is not valid anymore');
      }
      console.log(
        recoveryToken,
        _result_user_recovery.reset_password_token,
        _result_user_recovery.recoverysalt
      )

      const isValidPassword = await authProvider.verifyPassword(
        String(recoveryToken),
        String(_result_user_recovery.reset_password_token),
        String(_result_user_recovery.recoverysalt)
      );

      console.log("Got here")


      // Hash new password
      const {hashedPassword, salt} = await authProvider.hashPassword(newPassword);

      const user = new User(
        _result_user.email,
        _result_user.name,
        hashedPassword,
        _result_user.role
      );
  
      const savedUser = await authRepository.updatePassword(user, salt);

      return true

    }
    // TODO: gerar o link no outro, no controllar passar para aqui o link (email e toker) mais a nova pass do body e implementar isso
    return {
        generateRecoveryToken,
        loginWithRecoveryToken
    }
}

module.exports = recoverPasswordUseCase