class InvalidEntry extends Error {
    constructor(field, entry, reason) {
        let message = `A entrada '${entry}' para o campo '${field}' é inválida`
        message += !reason ? '.' : `: ${reason}.`
        super(message)
    }
}

module.exports = InvalidEntry