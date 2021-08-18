const database = require('../models');
const categoriaValidator = require('../validations/categoriaValidator');

const NotFound = require('../errors/NotFound');
const MissingField = require('../validations/errors/MissingField');
const InvalidField = require('../validations/errors/InvalidField');
const InvalidEntry = require('../validations/errors/InvalidEntry');
const InvalidCharacterCount = require('../validations/errors/InvalidCharacterCount');
const AlreadyExists = require('../validations/errors/AlreadyExists');

let errorCode = 500;

class CategoriasController {
    static async readCategorias(req, res) {
        try {
            const allCategorias = await database.Categorias.findAll()
            return res.status(200).json(allCategorias)
        } catch (error) {
            return res.status(errorCode).json({ message: error.message })
        }
    }
    
    static async readCategoria(req, res) {
        const { id } = req.params
        try {
            const oneCategoria = await database.Categorias.findOne({ where: { id: Number(id) } })
            if (!oneCategoria)
                throw new NotFound();
            return res.status(200).json(oneCategoria)
        } catch (error) {
            errorCode = error instanceof NotFound ? 404 : 500;
            return res.status(errorCode).json({ message: error.message })
        }
    }

    static async readVideosInCategoria(req, res) {
        const { id } = req.params
        try {
            const allVideosInCategoria = await database.Videos.findAll({ where: { categoriaId: Number(id) } })
            if (allVideosInCategoria.length === 0)
                throw new NotFound();
            return res.status(200).json(allVideosInCategoria)
        } catch (error) {
            errorCode = error instanceof NotFound ? 404 : 500;
            return res.status(errorCode).json({ message: error.message })
        }
    }
    
    static async createCategoria(req, res) {
        const newCategoria = req.body
        try {
            await categoriaValidator.hasAllFields(newCategoria)
            const createdCategoria = await database.Categorias.create(newCategoria)
            return res.status(201).json(createdCategoria)
        } catch (error) {
            errorCode = 500;
            if (error instanceof InvalidField || error instanceof MissingField)
                errorCode = 422
            else if (error instanceof InvalidEntry || error instanceof InvalidCharacterCount)
                errorCode = 400
            else if (error instanceof AlreadyExists)
                errorCode = 409
            return res.status(errorCode).json({ message: error.message })
        }
    }
    
    static async updateCategoria(req, res) {
        const { id } = req.params
        const updateInfo = req.body
        try {
            await categoriaValidator.fields(updateInfo)
            await database.Categorias.update(updateInfo, { where: { id: Number(id) } })
            return CategoriasController.readCategoria(req, res)
        } catch (error) {
            errorCode = 500;
            if (error instanceof InvalidField)
                errorCode = 422
            else if (error instanceof InvalidEntry || error instanceof InvalidCharacterCount)
                errorCode = 400
            else if (error instanceof AlreadyExists)
                errorCode = 409
            return res.status(errorCode).json({ message: error.message })
        }
    }
    
    static async deleteCategoria(req, res) {
        const { id } = req.params
        try {
            const wasDeleted = await database.Categorias.destroy({ where: { id: Number(id) } })
            if (!wasDeleted)
                throw new NotFound();
            return res.status(200).json({ message: `Categoria com id ${id} excluída com sucesso!`})
        } catch (error) {
            errorCode = error instanceof NotFound ? 404 : 500;
            return res.status(errorCode).json({ message: error.message })
        }
    }
}

module.exports = CategoriasController