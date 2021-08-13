class InvalidCharacterCount extends Error {
    constructor(field, max, min) {
        var message = `O campo ${field} precisa conter no máximo ${max} caracteres.`
        if(typeof min != 'undefined')
            message = `O campo ${field} precisa conter entre ${min} e ${max} caracteres.`
        super(message)
    }
}

module.exports = InvalidCharacterCount