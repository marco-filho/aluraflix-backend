const InvalidField = require('./errors/InvalidField');
const InvalidEntry = require('./errors/InvalidEntry');
const InvalidCharacterCount = require('./errors/InvalidCharacterCount');
const MissingField = require('./errors/MissingField');
const validFields = ['titulo', 'cor']

class categoriaValidator {
    static hasAllFields(categoria) {
        this.fields(categoria)
        validFields.forEach(f => {
            if (!(f in categoria))
                throw new MissingField(validFields);
        })
    }

    static fields(categoria) {
        for (const field in categoria) {
            if (validFields.includes(field)) {
                if ((typeof field != 'undefined')) {
                    switch (field) {
                        case 'titulo':
                            this.tittle(categoria[field])
                            break;
                        case 'cor':
                            this.color(categoria[field])
                            break;
                        default:
                            throw new InvalidField(field)
                    }
                }
            } else throw new InvalidField(field)
        }
    }
                                
    static tittle(tittle) {
        let max = 40, min = 1
        if (tittle.length <= max && tittle.length >= min)
            return true
        else
            throw new InvalidCharacterCount('titulo', max, min)
    }

    static color(color) {
        const regex = /^([A-F0-9]{3}){1,2}$/i
        if (regex.test(color)) {
            if (color.length === 3) {
                let c = color
                color = c[0]+c[0] + c[1]+c[1] + c[2]+c[2] // hex 3 to 6
            }
            return true
        }
        else
            throw new InvalidEntry('cor', color,
                'deve conter exatamente 6 caracteres e ' +
                'apenas números ou as letras \'A-F\'')
    }
}

module.exports = categoriaValidator