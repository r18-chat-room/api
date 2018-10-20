const bodyParser = require('body-parser')
const error = require('../tools/errors')

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
    app.post('/v1/app/food/comment/get', bodyParserMiddleware,
        require('./app/food/comment/get').handle)
    app.post('/v1/app/food/tag/random', bodyParserMiddleware,
        require('./app/food/tag/random').handle)
    app.post('/v1/app/food/user/comment/get', bodyParserMiddleware,
        require('./app/food/user/comment/get').handle)
    app.post('/v1/app/food/user/comment/delete', bodyParserMiddleware,
        require('./app/food/user/comment/delete').handle)
    // app.use(errorHandle)
}

module.exports = {
    init: init
}