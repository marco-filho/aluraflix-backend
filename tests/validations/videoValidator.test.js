const videoValidator = require('../../api/validations/videoValidator')
const InvalidCharacterCount = require('../../api/validations/errors/InvalidCharacterCount')
const InvalidEntry = require('../../api/validations/errors/InvalidEntry')
const InvalidField = require('../../api/validations/errors/InvalidField')
const MissingField = require('../../api/validations/errors/MissingField')
const database = require('../../api/models')
const { Video } = require('../utils/factories')

describe('Video validation', () => {
    afterEach(() => jest.restoreAllMocks())


    test('hasAllFields() should return true', () => {
        const spy = jest.spyOn(videoValidator, 'fields').mockImplementation(() => true)
        
        expect(videoValidator.hasAllFields(Video))
            .resolves.toBe(true)
        expect(spy).toHaveBeenCalled()
    })
    test('hasAllFields() should throw MissingField', () => {
        const spy = jest.spyOn(videoValidator, 'fields').mockImplementation(() => true)
        
        expect(videoValidator.hasAllFields({ titulo: 'Incomplete video object' }))
            .rejects.toThrow(MissingField)
        expect(spy).toHaveBeenCalled()
    })
    

    test('fields() should return true', () => {
        const spy = jest.spyOn(videoValidator, 'categoryId').mockImplementation(() => true)
            
        expect(videoValidator.fields(Video))
            .resolves.toBe(true)
        expect(spy).toHaveBeenCalled()
    })
    test('fields() should throw InvalidEntry', () => {
        expect(videoValidator.fields({ titulo: null }))
            .rejects.toThrow(InvalidEntry)
        expect(videoValidator.fields({ titulo: undefined }))
            .rejects.toThrow(InvalidEntry)
    })
    test('fields() should throw InvalidField', () => {
        expect(videoValidator.fields({ invalid_field: '' }))
            .rejects.toThrow(InvalidField)
    })
    

    test('title() should return true', () => {
        expect(videoValidator.title('1')).toBe(true)
        expect(videoValidator.title(new Array(101).fill().join())).toBe(true)
    })
    test('title() should throw InvalidCharacterCount', () => {
        expect(() => videoValidator.title('')).toThrow(InvalidCharacterCount)
        expect(() => videoValidator.title(new Array(102).fill().join())).toThrow(InvalidCharacterCount)
    })
    

    test('description() returns true', () => {
        expect(videoValidator.description('')).toBe(true)
        expect(videoValidator.description(new Array(5001).fill().join())).toBe(true)
    })
    test('description() should throw InvalidCharacterCount', () => {
        expect(() => videoValidator.description(new Array(5002).fill().join())).toThrow(InvalidCharacterCount)
    })
    

    test('url() returns true', () => {
        expect(videoValidator.url('abcdefghijk')).toBe(true)
        expect(videoValidator.url('abc123__--k')).toBe(true)
    })
    test('url() should throw InvalidEntry', () => {
        expect(() => videoValidator.url('abcdefghij#')).toThrow(InvalidEntry)
        expect(() => videoValidator.url('abcdefghij%')).toThrow(InvalidEntry)
        expect(() => videoValidator.url('abcdefghij*')).toThrow(InvalidEntry)
        expect(() => videoValidator.url('abcdefghij\\')).toThrow(InvalidEntry)
        expect(() => videoValidator.url('abcdefghij')).toThrow(InvalidEntry)
        expect(() => videoValidator.url('abcdefghijkl')).toThrow(InvalidEntry)
    })


    test('categoryId() should return true', () => {
        const spy = jest.spyOn(database.Categorias, 'findOne').mockImplementation(() => 1)

        expect(videoValidator.categoryId(1))
            .resolves.toBe(true)
        expect(spy).toHaveBeenCalled()

        spy.mockRestore()
    })
    test('categoryId() should return InvalidEntry', () => {
        const spy = jest.spyOn(database.Categorias, 'findOne').mockImplementation(() => 0)

        expect(videoValidator.categoryId(0))
            .resolves.toBeInstanceOf(InvalidEntry)
        expect(spy).toHaveBeenCalled()

        spy.mockRestore()
    })
})