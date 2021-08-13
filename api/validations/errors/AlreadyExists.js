class AlreadyExists extends Error {
    constructor(field, entry) {
        const message = `A entrada '${entry}' para o campo '${field}' já existe.`
        super(message)
    }
}

module.exports = AlreadyExists