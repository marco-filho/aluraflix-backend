const database = require('../models')
const videoValidator = require('../validations/videoValidator')

const NotFound = require('../errors/NotFound')
const MissingField = require('../validations/errors/MissingField')
const InvalidField = require('../validations/errors/InvalidField')
const InvalidEntry = require('../validations/errors/InvalidEntry')
const InvalidCharacterCount = require('../validations/errors/InvalidCharacterCount')

let errorCode = 500

class VideosController {
    static async readVideos(req, res) {
        let query = req.query.search
        try {
            let videos 
            if (query)
                videos = await database.Videos.findAll({
                    where: {
                        titulo: {[require('sequelize').Sequelize.Op.like]: `%${query}%`}
                    }
                })
            else
                videos = await database.Videos.findAll()
            return res.status(200).json(videos)
        } catch (error) {
            return res.status(errorCode).json({ message: error.message })
        }
    }
    
    static async readVideo(req, res) {
        const { id } = req.params
        try {
            const oneVideo = await database.Videos.findOne({ where: { id: Number(id) } })
            if (!oneVideo)
                throw new NotFound()
            return res.status(200).json(oneVideo)
        } catch (error) {
            errorCode = error instanceof NotFound ? 404 : 500
            return res.status(errorCode).json({ message: error.message })
        }
    }
    
    static async createVideo(req, res) {
        const newVideo = req.body
        try {
            await videoValidator.hasAllFields(newVideo)
            const createdVideo = await database.Videos.create(newVideo)
            return res.status(201).json(createdVideo)
        } catch (error) {
            errorCode = 500
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
            await videoValidator.fields(updateInfo)
            await database.Videos.update(updateInfo, { where: { id: Number(id) } })
            return VideosController.readVideo(req, res)
        } catch (error) {
            errorCode = 500
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
                throw new NotFound()
            return res.status(200).json({ message: `Video com id ${id} exclu??do com sucesso!`})
        } catch (error) {
            errorCode = error instanceof NotFound ? 404 : 500
            return res.status(errorCode).json({ message: error.message })
        }
    }
}

module.exports = VideosController