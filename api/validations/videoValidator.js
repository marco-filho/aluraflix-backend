const InvalidField = require('./errors/InvalidField');
const InvalidEntry = require('./errors/InvalidEntry');
const InvalidCharacterCount = require('./errors/InvalidCharacterCount');
const MissingField = require('./errors/MissingField');
const validFields = ['titulo', 'descricao', 'url']

class videoValidator {
    static hasAllFields(video) {
        this.fields(video)
        validFields.forEach(f => {
            if (!(f in video))
                throw new MissingField(validFields);
        })
    }

    static fields(video) {
        for (const field in video) {
            if (validFields.includes(field)) {
                if ((typeof field != 'undefined')) {
                    switch (field) {
                        case 'titulo':
                            this.tittle(video[field])
                            break;
                        case 'descricao':
                            this.description(video[field])
                            break;
                        case 'url':
                            this.url(video[field])
                            break;
                        default:
                            throw new InvalidField(field)
                    }
                }
            } else throw new InvalidField(field)
        }
    }
                                
    static tittle(tittle) {
        let max = 100, min = 1
        if (tittle.length <= max && tittle.length >= min)
            return true
        else
            throw new InvalidCharacterCount('titulo', max, min)
    }

    static description(description) {
        let max = 5000
        if (description.length <= max)
            return true
        else
            throw new InvalidCharacterCount('descricao', max)
    }

    static url(url) {
        const regex = /[\w|-]{11}/
        if (url.length === 11 && regex.test(url))
            return true
        else
            throw new InvalidEntry('url', url,
                'deve conter exatamente 11 caracteres e ' +
                'apenas letras, números ou os simbolos \'_\' e \'-\'')
    }
}

module.exports = videoValidator