const aipApiInfo = require('../../../configs/baiduAiPlatform');
const aipSpeech = require('baidu-aip-sdk').speech;
const errors = require('../../../tools/errors');
const logger = require('../../../tools/log4js');
const axios = require('axios')

const aipClient = new aipSpeech(aipApiInfo.APP_ID, aipApiInfo.API_Key, aipApiInfo.Secret_Key);

const normalHandle = async function (req, res) {
    if (!req.body.text) {
        errors.badRequest(res, 'Speech text missing.');
        return;
    } else {
        if (req.body.type === 'cantonese') {
            const result = await axios.get('http://120.24.87.124/cgi-bin/ekho2.pl', {
                params: {
                    cmd: 'SAVEOGG',
                    voice: 'EkhoCantonese',
                    speedDelta: '0',
                    pitchDelta: '0',
                    volumeDelta: '0',
                    text: req.body.text
                }
            })
            
            res.set('Content-Type', 'audio/mpeg').send(result.data);
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
}

module.exports = {
    normalHandle: normalHandle
};