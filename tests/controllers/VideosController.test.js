jest.mock('../../api/models')
jest.mock('../../api/validations/videoValidator')
const VideosController = require('../../api/controllers/VideosController')
const NotFound = require('../../api/errors/NotFound')
let { Video, Videos, req, res } = require('../utils/factories')

describe('Video validation', () => {
    beforeEach(() => {
        ({ req, res } = require('../utils/factories'))
    })
    afterEach(() => {
        jest.resetModules()
    })


    test('readVideos() should return 200 with a list of videos', async () => {
        await VideosController.readVideos(req, res)
        expect(res.status()).toBe(200)
        expect(res.json()).toBe(Videos)
        req.query.search = 'a'
        await VideosController.readVideos(req, res)
        expect(res.status()).toBe(200)
        expect(res.json()).toBe(Videos)
    })


    test('readVideo() should return 200 with a video', async () => {
        req.params.id = 1
        await VideosController.readVideo(req, res)
        expect(res.status()).toBe(200)
        expect(res.json()).toBe(Video)
    })
    test('readVideo() should return 404 with NotFound', async () => {
        req.params.id = 0
        await VideosController.readVideo(req, res)
        expect(res.status()).toBe(404)
        expect(res.json()).toStrictEqual({ message: new NotFound().message })
    })


    test('createVideo() should return 201 with a video', async () => {
        req.body = Video
        await VideosController.createVideo(req, res)
        expect(res.status()).toBe(201)
        expect(res.json()).toBe(Video)
    })


    test('updateVideo() should return 200 with a video', async () => {
        req.params.id = 1
        req.body = Video
        await VideosController.updateVideo(req, res)
        expect(res.status()).toBe(200)
        expect(res.json()).toBe(Video)
    })
    test('updateVideo() should return 404 with NotFound', async () => {
        req.params.id = 0
        req.body = Video
        await VideosController.updateVideo(req, res)
        expect(res.status()).toBe(404)
        expect(res.json()).toStrictEqual({ message: new NotFound().message })
    })


    test('deleteVideo() should return 200 with a successful message', async () => {
        req.params.id = 1
        await VideosController.deleteVideo(req, res)
        expect(res.status()).toBe(200)
        expect(res.json()).toBeDefined()
    })
    test('deleteVideo() should return 404 with NotFound', async () => {
        req.params.id = 0
        await VideosController.deleteVideo(req, res)
        expect(res.status()).toBe(404)
        expect(res.json()).toStrictEqual({ message: new NotFound().message })
    })
})