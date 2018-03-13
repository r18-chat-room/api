const init = function (app) {
    app.post('/v1/app/language/translate', require('./app/language/translate').multer, require('./app/language/translate').handle);
    // app.post('/v1/app/language/speech', require('./app/language/speech'));
}

module.exports = {
    init: init
}