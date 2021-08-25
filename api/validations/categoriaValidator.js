const InvalidField = require('./errors/InvalidField')
const InvalidEntry = require('./errors/InvalidEntry')
const InvalidCharacterCount = require('./errors/InvalidCharacterCount')
const MissingField = require('./errors/MissingField')
const AlreadyExists = require('./errors/AlreadyExists')
const database = require('../models')
const validFields = ['titulo', 'cor']

class categoriaValidator {
    static async hasAllFields(categoria) {
        this.fields(categoria)
        validFields.forEach(f => {
            if (!(f in categoria))
                throw new MissingField(validFields)
        })
        return true
    }

    static async fields(categoria) {
        for (const field in categoria) {
            if (validFields.includes(field)) {
                if (!categoria[field]) throw new InvalidEntry(field, categoria[field])
                switch (field) {
                    case 'titulo':
                        this.title(categoria[field])
                        break
                    case 'cor':
                        this.color(categoria)
                        const result = await this.exists(categoria[field])
                        if (result) throw result
                        break
                    default:
                        throw new InvalidField(field)
                }
            } else throw new InvalidField(field)
        }
        return true
    }
                                
    static title(title) {
        let max = 40, min = 1
        if (title.length <= max && title.length >= min)
            return true
        else
            throw new InvalidCharacterCount('titulo', max, min)
    }

    static color(category) {
        let color = category.cor
        const regex = /^([A-F0-9]{3}){1,2}$/i
        if (regex.test(color)) {
            if (color.length === 3) {
                let c = color
                color = c[0]+c[0] + c[1]+c[1] + c[2]+c[2] // hex 3 to 6
            }
            category.cor = color
            return true
        }
        else
            throw new InvalidEntry('cor', color,
                'deve conter exatamente 3 ou 6 caracteres e ' +
                'apenas números ou as letras \'A-F\'')
    }

    static async exists(color) {
        try {
            const found = await database.Categorias.findOne({ where: { cor: color } })
            if (found)
                throw new AlreadyExists('cor', color)
            else
                return false
        } catch (error) {
            return error
        }
    }
}

module.exports = categoriaValidator