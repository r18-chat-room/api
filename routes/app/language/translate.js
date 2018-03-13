const apiInfo = require('../../../configs/baiduAiPlatform');
const AipSpeech = require('baidu-aip-sdk').speech;
const httpClient = require('baidu-aip-sdk').HttpClient;
const multer = require('multer');
const errors = require('../../../tools/errors');

const aipClient = new AipSpeech(apiInfo.APP_ID, apiInfo.API_Key, apiInfo.Secret_Key);

const multerMiddleware = multer({
    storage: multer.memoryStorage(),    // to get the buffer of the voice file
    limits: {
        fieldSize: 10000000             // limit the field size to 10MB
    }
})



const handle = async function (req, res) {
    let reqObj;
    try {
        reqObj = JSON.parse(req.body);
    } catch (e) {
        errors.badRequest(res, 'Bad Request.');
        return;
    }
    if (req.from === 'voice') {
        if (!req.file) {
            errors.badRequest(res, 'No voice file was found.')
            return;
        } else {
            if (req.file.mimetype !== 'audio/amr') {
                errors.badRequest(res, 'Only support voice file encoded by amr at 8000 sample rate.')
            } else {
                
            }
        }
        
    }
}

module.exports = {
    multer: multerMiddleware.single('file'),
    handle: handle
}