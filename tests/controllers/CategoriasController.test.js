jest.mock('../../api/models')
jest.mock('../../api/validations/categoriaValidator')
const CategoriasController = require('../../api/controllers/CategoriasController')
const NotFound = require('../../api/errors/NotFound')
let { Categoria, Categorias, Videos, req, res } = require('../utils/factories')

describe('Categoria validation', () => {
    beforeEach(() => {
        ({ req, res } = require('../utils/factories'))
    })
    afterEach(() => {
        jest.resetModules()
    })


    test('readCategorias() should return 200 with a list of videos', async () => {
        await CategoriasController.readCategorias(req, res)
        expect(res.status()).toBe(200)
        expect(res.json()).toBe(Categorias)
    })


    test('readCategoria() should return 200 with a categoria', async () => {
        req.params.id = 1
        await CategoriasController.readCategoria(req, res)
        expect(res.status()).toBe(200)
        expect(res.json()).toBe(Categoria)
    })
    test('readCategoria() should return 404 with NotFound', async () => {
        req.params.id = 0
        await CategoriasController.readCategoria(req, res)
        expect(res.status()).toBe(404)
        expect(res.json()).toStrictEqual({ message: new NotFound().message })
    })


    test('readVideosInCategoria() should return 200 with a list of videos matching categoriaId', async () => {
        req.params.id = 1
        await CategoriasController.readVideosInCategoria(req, res)
        expect(res.status()).toBe(200)
        expect(res.json()).toBe(Videos)
    })
    test('readVideosInCategoria() should return 404 with NotFound', async () => {
        req.params.id = 0
        await CategoriasController.readVideosInCategoria(req, res)
        expect(res.status()).toBe(404)
        expect(res.json()).toStrictEqual({ message: new NotFound().message })
    })


    test('createCategoria() should return 201 with a categoria', async () => {
        req.body = Categoria
        await CategoriasController.createCategoria(req, res)
        expect(res.status()).toBe(201)
        expect(res.json()).toBe(Categoria)
    })


    test('updateCategoria() should return 200 with a categoria', async () => {
        req.params.id = 1
        req.body = Categoria
        await CategoriasController.updateCategoria(req, res)
        expect(res.status()).toBe(200)
        expect(res.json()).toBe(Categoria)
    })
    test('updateCategoria() should return 404 with NotFound', async () => {
        req.params.id = 0
        req.body = Categoria
        await CategoriasController.updateCategoria(req, res)
        expect(res.status()).toBe(404)
        expect(res.json()).toStrictEqual({ message: new NotFound().message })
    })


    test('deleteCategoria() should return 200 with a successful message', async () => {
        req.params.id = 1
        await CategoriasController.deleteCategoria(req, res)
        expect(res.status()).toBe(200)
        expect(res.json()).toBeDefined()
    })
    test('deleteCategoria() should return 404 with NotFound', async () => {
        req.params.id = 0
        await CategoriasController.deleteCategoria(req, res)
        expect(res.status()).toBe(404)
        expect(res.json()).toStrictEqual({ message: new NotFound().message })
    })
})