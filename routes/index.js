const bodyParser = require('body-parser')
const error = require('../tools/errors')
const proxy = require('express-http-proxy')

/**
 * When a error occurs in body-parser, it will goes into this handle.
 * 
 * @param {expressErr} err 
 * @param {expressRequest} req 
 * @param {expressResponse} res 
 * @param {nextMiddleware} next 
 */
const errorHandle = function (err, req, res, next) {
    errors.badRequest(res, 'Bad Request.')
}

const bodyParserMiddleware = bodyParser.json({
    limit: '1kb'
})

const init = function (app) {
    app.post('/v1/app/language/translate', require('./app/language/translate').multer,
        require('./app/language/translate').handle)
    app.post('/v1/app/language/speech', bodyParserMiddleware,
        require('./app/language/speech').normalHandle)
    app.post('/v1/app/food/user/tag/get', bodyParserMiddleware,
        require('./app/food/user/tag/get').handle)
    app.post('/v1/app/food/user/favorite/get', bodyParserMiddleware,
        require('./app/food/user/favorite/get').handle)
    app.post('/v1/app/food/user/favorite/add', bodyParserMiddleware,
        require('./app/food/user/favorite/add').handle)
    app.post('/v1/app/food/user/favorite/delete', bodyParserMiddleware,
        require('./app/food/user/favorite/delete').handle)
    app.post('/v1/app/food/user/tag/edit', bodyParserMiddleware,
        require('./app/food/user/tag/edit').handle)
    app.post('/v1/app/food/comment/get', bodyParserMiddleware,
        require('./app/food/comment/get').handle)
    app.post('/v1/app/food/tag/random', bodyParserMiddleware,
        require('./app/food/tag/random').handle)
    app.post('/v1/app/food/user/comment/get', bodyParserMiddleware,
        require('./app/food/user/comment/get').handle)
    app.post('/v1/app/food/comment/add', bodyParserMiddleware,
        require('./app/food/comment/add').handle)
    app.post('/v1/app/food/user/comment/delete', bodyParserMiddleware,
        require('./app/food/user/comment/delete').handle)
    app.post('/v1/app/food/recommend/user', bodyParserMiddleware,
        require('./app/food/recommend/user').handle)
    app.post('/v1/app/food/recognize', require('./app/food/recognize').upload,
        require('./app/food/recognize').handle)
    // app.use(errorHandle)
    app.get('/v1/internel/food/get-all-info',
        require('./internel/food/getAllInfo').handle)
}

module.exports = {
    init: init
}