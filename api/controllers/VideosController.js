const database = require('../models');
const videoValidator = require('../validations/videoValidator');

const NotFound = require('../errors/NotFound');
const MissingField = require('../validations/errors/MissingField');
const InvalidField = require('../validations/errors/InvalidField');
const InvalidEntry = require('../validations/errors/InvalidEntry');
const InvalidCharacterCount = require('../validations/errors/InvalidCharacterCount');

let errorCode = 500;

class VideosController {
    static async readVideos(req, res) {
        try {
            const allVideos = await database.Videos.findAll()
            return res.status(200).json(allVideos)
        } catch (error) {
            return res.status(errorCode).json({ message: error.message })
        }
    }
    
    static async readVideo(req, res) {
        const { id } = req.params
        try {
            const oneVideo = await database.Videos.findOne({ where: { id: Number(id) } })
            if (!oneVideo)
                throw new NotFound();
            return res.status(200).json(oneVideo)
        } catch (error) {
            errorCode = error instanceof NotFound ? 404 : 500;
            return res.status(errorCode).json({ message: error.message })
        }
    }
    
    static async createVideo(req, res) {
        const newVideo = req.body
        try {
            videoValidator.hasAllFields(newVideo)
            const createdVideo = await database.Videos.create(newVideo)
            return res.status(201).json(createdVideo)
        } catch (error) {
            if (error instanceof MissingField || error instanceof InvalidField)
                errorCode = 422
            else if (error instanceof InvalidEntry || error instanceof InvalidCharacterCount)
                errorCode = 400
            return res.status(errorCode).json({ message: error.message })
        }
    }
    
    static async updateVideo(req, res) {
        const { id } = req.params
        const updateInfo = req.body
        try {
            videoValidator.fields(updateInfo)
            await database.Videos.update(updateInfo, { where: { id: Number(id) } })
            return VideosController.readVideo(req, res)
        } catch (error) {
            if (error instanceof InvalidField)
                errorCode = 422
            else if (error instanceof InvalidEntry || error instanceof InvalidCharacterCount)
                errorCode = 400
            return res.status(errorCode).json({ message: error.message })
        }
    }
    
    static async deleteVideo(req, res) {
        const { id } = req.params
        try {
            const wasDeleted = await database.Videos.destroy({ where: { id: Number(id) } })
            if (!wasDeleted)
                throw new NotFound();
            return res.status(200).json({ message: `Video com id ${id} excluído com sucesso!`})
        } catch (error) {
            errorCode = error instanceof NotFound ? 404 : 500;
            return res.status(errorCode).json({ message: error.message })
        }
    }
}

module.exports = VideosController