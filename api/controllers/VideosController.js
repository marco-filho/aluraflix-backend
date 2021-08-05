const database = require('../models');
const videoValidator = require('../validations/videoValidator');

class VideosController {
    static async readVideos(req, res) {
        try {
            const allVideos = await database.Videos.findAll()
            return res.status(200).json(allVideos)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    
    static async readVideo(req, res) {
        const { id } = req.params
        try {
            const oneVideo = await database.Videos.findOne({ where: { id: Number(id) } })
            return res.status(200).json(oneVideo)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    
    static async createVideo(req, res) {
        const newVideo = req.body
        try {
            videoValidator.hasAllFields(newVideo)
            const createdVideo = await database.Videos.create(newVideo)
            return res.status(201).json(createdVideo)
        } catch (error) {
            res.status(500).json({ message: error.message })
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
            res.status(500).json({ message: error.message })
        }
    }
    
    static async deleteVideo(req, res) {
        const { id } = req.params
        try {
            await database.Videos.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ message: `Video com id ${id} excluído com sucesso!`})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = VideosController