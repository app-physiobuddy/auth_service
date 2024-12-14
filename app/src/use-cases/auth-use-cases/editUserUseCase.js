const editUserUseCase = ( authRepository, authProvider ) => {
    return async (token_, changes) => {
        console.log("on edit use case")
        const payload = await authProvider.decodeToken(token_)
        console.log(changes)
        const email = payload.email
        const _result_user = await authRepository.updateUser(changes, email);
        return _result_user
    }}

module.exports = editUserUseCase