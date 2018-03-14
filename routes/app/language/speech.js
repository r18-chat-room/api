const aipApiInfo = require('../../../configs/baiduAiPlatform');
const aipSpeech = require('baidu-aip-sdk').speech;
const bodyParser = require('body-parser');
const errors = require('../../../tools/errors');

const aipClient = new aipSpeech(aipApiInfo.APP_ID, aipApiInfo.API_Key, aipApiInfo.Secret_Key);

const normalHandle = async function (req, res) {
    if (!req.body.text) {
        errors.badRequest(res, 'Speech text missing.');
        return;
    } else {
        // TO-DO: Error handle is needed.
        const result = await aipClient.text2audio(req.body.text);
        res.set('Content-Type', 'audio/mpeg').send(result.data);
    }
}

/**
 * When a error occurs in body-parser, it will goes into this handle.
 * 
 * @param {expressErr} err 
 * @param {expressRequest} req 
 * @param {expressResponse} res 
 * @param {nextMiddleware} next 
 */
const errorHandle = function (err, req, res, next) {
    errors.badRequest(res, 'Bad Request.');
}

module.exports = {
    bodyParserMiddleware: bodyParser.json({
        limit: '1kb'
    }),
    errorHandle: errorHandle,
    normalHandle: normalHandle
};