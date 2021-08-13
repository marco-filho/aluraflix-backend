class InvalidField extends Error {
    constructor(invalidFieldName) {
        const message = `O campo ${invalidFieldName} é inválido.`
        super(message)
    }
}

module.exports = InvalidField