const { Router } = require('express')
const CategoriasController = require('../controllers/CategoriasController')

const router = Router()

router.get('/categorias', CategoriasController.readCategorias)
router.get('/categorias/:id', CategoriasController.readCategoria)
router.get('/categorias/:id/videos', CategoriasController.readVideosInCategoria)
router.post('/categorias', CategoriasController.createCategoria)
router.put('/categorias/:id', CategoriasController.updateCategoria)
router.delete('/categorias/:id', CategoriasController.deleteCategoria)

module.exports = router