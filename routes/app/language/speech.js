const aipApiInfo = require('../../../configs/baiduAiPlatform');
const aipSpeech = require('baidu-aip-sdk').speech;
const bodyParser = require('body-parser');
const errors = require('../../../tools/errors');
const logger = require('../../../tools/log4js');

const aipClient = new aipSpeech(aipApiInfo.APP_ID, aipApiInfo.API_Key, aipApiInfo.Secret_Key);

const normalHandle = async function (req, res) {
    if (!req.body.text) {
        errors.badRequest(res, 'Speech text missing.');
        return;
    } else {
        try {
            logger.infoLogger.info('Send text2audio request: ', req.body.text);
            const result = await aipClient.text2audio(req.body.text);
            if (result.data) {
                res.set('Content-Type', 'audio/mpeg').send(result.data);
            } else {
                errors.badRequest(res, 'Bad request to baidu api service.');
                logger.warnLogger.warn('Bad request to baidu api service: ', result);
            }
        } catch (e) {
            logger.warnLogger.warn('Can\'t connect to baidu api service: ', e);
            errors.internalError(res, 'Can\'t connect to baidu api service.');
        }

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