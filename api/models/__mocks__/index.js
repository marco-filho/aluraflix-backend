const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const dirname = path.resolve(__dirname, '..')
const capitalize = (s) => { return s.charAt(0).toUpperCase() + s.slice(1) }
const factory = require('../../../tests/utils/factories')
const db = {}

fs
  .readdirSync(dirname)
  .filter(file => {
    return (file.indexOf('../') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    db[capitalize(path.basename(file, '.js'))] = {}
  })

for (let prop in db) {
  db[prop] = {
    findOne({ where: { id } }) {
      return !id ? 0 : factory[prop.slice(0, -1)]
    },
    findAll(options) {
      return !options || options.where.categoriaId ? factory[prop] : ''
    },
    create(newItem) {
      return newItem
    },
    update(updateInfo, { where: { id } }) {
    },
    destroy({ where: { id } }) {
      return !id ? 0 : 1
    }
  }
}

module.exports = db