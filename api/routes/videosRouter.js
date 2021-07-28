const { Router } = require('express')
const VideosController = require('../controllers/VideosController')

const router = Router()

router.get('/videos', VideosController.readVideos)
router.get('/videos/:id', VideosController.readVideo)
router.post('/videos', VideosController.createVideo)
router.put('/videos/:id', VideosController.updateVideo)
router.delete('/videos/:id', VideosController.deleteVideo)

module.exports = router