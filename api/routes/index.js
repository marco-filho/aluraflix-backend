const bodyParser = require('body-parser')
const videos = require('./videosRouter')

module.exports = app => {
    app.use(
        bodyParser.json(),
        videos
        )
}