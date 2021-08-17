const bodyParser = require('body-parser');
const videos = require('./videosRouter');
const categorias = require('./categoriasRouter');

module.exports = app => {
    app.use(
        bodyParser.json(),
        videos,
        categorias
        )
}