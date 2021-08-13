class InvalidEntry extends Error {
    constructor(field, entry, reason) {
        const message = `A entrada '${entry}' para o campo '${field}' é inválida: ${reason}.`
        super(message)
    }
}

module.exports = InvalidEntry