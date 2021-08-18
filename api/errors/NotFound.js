class NotFound extends Error {
    constructor(message) {
        message = !message ? 'Não encontrado.' : message;
        super(message)
    }
}

module.exports = NotFound