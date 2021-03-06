const InvalidField = require('./errors/InvalidField')
const InvalidEntry = require('./errors/InvalidEntry')
const InvalidCharacterCount = require('./errors/InvalidCharacterCount')
const MissingField = require('./errors/MissingField')
const database = require('../models')
const necessaryFields = ['titulo', 'descricao', 'url']
const validFields = necessaryFields.concat('categoriaId')

class videoValidator {
    static async hasAllFields(video) {
        await this.fields(video)
        necessaryFields.forEach(f => {
            if (!(f in video))
                throw new MissingField(necessaryFields)
        })
        return true
    }

    static async fields(video) {
        for (const field in video) {
            if (validFields.includes(field)) {
                if (!video[field]) throw new InvalidEntry(field, video[field])
                switch (field) {
                    case 'titulo':
                        this.title(video[field])
                        break
                    case 'descricao':
                        this.description(video[field])
                        break
                    case 'url':
                        this.url(video[field])
                        break
                    case 'categoriaId':
                        let result = await this.categoryId(video[field])
                        if (result != true) throw result
                        break
                    default:
                        throw new InvalidField(field)
                }
            } else throw new InvalidField(field)
        }
        return true
    }
                                
    static title(title) {
        let max = 100, min = 1
        if (title.length <= max && title.length >= min)
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
                'apenas letras, n??meros ou os simbolos \'_\' e \'-\'')
    }

    static async categoryId(categoryId) {
        try {
            const found = await database.Categorias.findOne({ where: { id: categoryId } })
            if (!found)
                throw new InvalidEntry('categoriaId', categoryId, 'a categoria n??o existe')
            else
                return true
        } catch (error) {
            return error
        }
    }
}

module.exports = videoValidator