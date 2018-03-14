const aipApiInfo = require('../../../configs/baiduAiPlatform');
const aipSpeech = require('baidu-aip-sdk').speech;
const httpClient = require('baidu-aip-sdk').HttpClient;
const baiduTranlateApiInfo = require('../../../configs/baiduTranslateApi');
const multer = require('multer');
const errors = require('../../../tools/errors');
const fetch = require('node-fetch');
const urlSearchParams = require('url').URLSearchParams;
const md5Generator = require('../../../tools/md5Generator');

const aipClient = new aipSpeech(aipApiInfo.APP_ID, aipApiInfo.API_Key, aipApiInfo.Secret_Key);

const multerMiddleware = multer({
    storage: multer.memoryStorage(),    // to get the buffer of the voice file
    limits: {
        fieldSize: 10000000             // limit the field size to 10MB
    }
})

/**
 * TO-DO: Error handle is needed.
 * Async method to call the baidu translate services 
 * 
 * @param {string} q queried translate string
 * @param {string} from 'zh'|'yue'
 * @param {string} to 'zh'|'yue'
 */
const baiduTranslateHelper = async function (q, from, to) {
    let salt = Math.floor(Math.random() * (500000 - 100000)) + 500000;
    const params = new urlSearchParams();
    params.append('q', q);
    params.append('from', from);
    params.append('to', to);
    params.append('appid', baiduTranlateApiInfo.appid);
    params.append('salt', salt);
    params.append('sign', md5Generator(`${baiduTranlateApiInfo.appid}${q}${salt}${baiduTranlateApiInfo.key}`))
    const translateResult = await fetch('https://fanyi-api.baidu.com/api/trans/vip/translate', { method: 'POST', body: params });
    return await translateResult.json();
}

const handle = async function (req, res) {
    let reqObj;
    try {
        reqObj = JSON.parse(req.body.info);
    } catch (e) {
        errors.badRequest(res, 'Bad Request.');
        return;
    }
    if (!reqObj.from || !reqObj.to) {
        errors.badRequest(res, 'Parameters missing.');
        return;
    }
    if (reqObj.from === 'voice') {
        if (!req.file) {
            errors.badRequest(res, 'No voice file was found.')
            return;
        } else {
            if (req.file.mimetype !== 'audio/amr') {
                errors.badRequest(res, 'Only support voice file encoded by amr at 8000 sample rate.');
                return;
            } else {
                let aipOptions = {};
                switch (reqObj.to) {
                    case 'contonese': 
                        aipOptions = {
                            lan: 'zh'
                        }
                        break;
                    case 'mandarin': 
                        aipOptions = {
                            lan: 'ct'
                        }
                        break;
                    default: 
                        errors.badRequest(res, 'The language is not supported yet.');
                        return;
                }

                // TO-DO: Error Handle is needed!
                const aipResult = await aipClient.recognize(req.file.buffer, 'amr', 8000, aipOptions);
                const translateResult = await baiduTranslateHelper(aipResult.result[0],
                                                                   aipOptions.lan === 'zh' ? 'zh' : 'yue',
                                                                   aipOptions.lan === 'zh' ? 'yue' : 'zh');
                res.send({
                    from: translateResult.trans_result[0].src,
                    to: translateResult.trans_result[0].dst
                })
            }
        }
    } else if (reqObj.from === 'text') {
        if (!reqObj.text || reqObj.text.trim() === '') {
            errors.badRequest(res, 'Empty string to translate');
            return;
        }
        const translateResult = await baiduTranslateHelper(reqObj.text, 'zh', 'yue');
        res.send({
            from: translateResult.trans_result[0].src,
            to: translateResult.trans_result[0].dst
        })
    }
}

module.exports = {
    multer: multerMiddleware.single('file'),
    handle: handle
}