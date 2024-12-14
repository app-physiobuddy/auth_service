function validationSanatize (input) {
    const textSanitize = () => {
        const sanatizedInput = input.trim().toLowerCase();
        return sanatizedInput;
    }
    const passwordSanitize = () => {
        let sanatizedInput = String(input);
        sanatizedInput = sanatizedInput.trim();
        return sanatizedInput;
    }

    const emailValidation = () => {
        const emailRegex = /.+@.+\..+/
        const isValid = emailRegex.test(input);
        return isValid
    }

    const emailSanitize = () => {
        let sanatizedInput = String(input);
        sanatizedInput = input.trim().toLowerCase();
        return sanatizedInput;
    }
    const dateValidation = () => {
        const isoRegex = /^(?:(\d{4}[-/](0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2]))|((0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/]\d{4}))$/;
        const isValid =  isoRegex.test(input);

        return isValid

    }
    return {
        textSanitize,
        passwordSanitize,
        emailSanitize,
        dateValidation,
        emailValidation
    }
}

module.exports = validationSanatize