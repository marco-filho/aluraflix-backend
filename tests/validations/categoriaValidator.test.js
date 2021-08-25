const categoriaValidator = require('../../api/validations/categoriaValidator')
const AlreadyExists = require('../../api/validations/errors/AlreadyExists')
const InvalidCharacterCount = require('../../api/validations/errors/InvalidCharacterCount')
const InvalidEntry = require('../../api/validations/errors/InvalidEntry')
const InvalidField = require('../../api/validations/errors/InvalidField')
const MissingField = require('../../api/validations/errors/MissingField')
const database = require('../../api/models')
const { Categoria } = require('../utils/factories')

describe('Categoria validation', () => {
    afterEach(() => jest.restoreAllMocks())


    test('hasAllFields() should return true', () => {
        const spy = jest.spyOn(categoriaValidator, 'fields').mockImplementation(() => true)
        
        expect(categoriaValidator.hasAllFields(Categoria))
            .resolves.toBe(true)
        expect(spy).toHaveBeenCalled()
    })
    test('hasAllFields() should throw MissingField', () => {
        const spy = jest.spyOn(categoriaValidator, 'fields').mockImplementation(() => true)
        
        expect(categoriaValidator.hasAllFields({ titulo: 'Incomplete color object' }))
            .rejects.toThrow(MissingField)
        expect(spy).toHaveBeenCalled()
    })
    

    test('fields() should return true', () => {
        const spy = jest.spyOn(categoriaValidator, 'exists').mockImplementation(() => false)
            
        expect(categoriaValidator.fields(Categoria))
            .resolves.toBe(true)
        expect(spy).toHaveBeenCalled()
    })
    test('fields() should throw InvalidEntry', () => {
        expect(categoriaValidator.fields({ titulo: null }))
            .rejects.toThrow(InvalidEntry)
        expect(categoriaValidator.fields({ titulo: undefined }))
            .rejects.toThrow(InvalidEntry)
    })
    test('fields() should throw InvalidField', () => {
        expect(categoriaValidator.fields({ invalid_field: '' }))
            .rejects.toThrow(InvalidField)
    })
    

    test('title() should return true', () => {
        expect(categoriaValidator.title('Test')).toBe(true)
        expect(categoriaValidator.title(new Array(41).fill().join())).toBe(true)

    })
    test('title() should throw InvalidCharacterCount', () => {
        expect(() => categoriaValidator.title('')).toThrow(InvalidCharacterCount)
        expect(() => categoriaValidator.title(new Array(42).fill().join())).toThrow(InvalidCharacterCount)
    })
    

    test('color() returns true', () => {
        expect(categoriaValidator.color({ cor:'abc123' })).toBe(true)
        expect(categoriaValidator.color({ cor:'abc' })).toBe(true)
    })
    test('color() should throw InvalidEntry', () => {
        expect(() => categoriaValidator.color('')).toThrow(InvalidEntry)
        expect(() => categoriaValidator.color('12')).toThrow(InvalidEntry)
        expect(() => categoriaValidator.color('abc1')).toThrow(InvalidEntry)
        expect(() => categoriaValidator.color('abc1234')).toThrow(InvalidEntry)
        expect(() => categoriaValidator.color('abcg12')).toThrow(InvalidEntry)
    })


    test('exists() should return false', () => {
        const spy = jest.spyOn(database.Categorias, 'findOne').mockImplementation(() => 0)

        expect(categoriaValidator.exists('abcdef'))
            .resolves.toBe(false)
        expect(spy).toHaveBeenCalled()
    })
    test('exists() should return AlreadyExists', () => {
        const spy = jest.spyOn(database.Categorias, 'findOne').mockImplementation(() => 1)

        expect(categoriaValidator.exists('abcdef'))
            .resolves.toBeInstanceOf(AlreadyExists)
        expect(spy).toHaveBeenCalled()
    })
})