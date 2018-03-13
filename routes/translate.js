const fs = require('fs');
const AipSpeech = require('baidu-aip-sdk').speech;

//新建一个对象，建议只保存一个对象调用服务接口
const client = new AipSpeech(APP_ID, API_Key, Secret_Key);

//设置百度翻译appid/key
const appid = '20180309000133294';
const key = '4VLNiuMnL132Xit6U5rY';

function zh2yue_trans(text) {
    let salt = (new Date).getTime();
    let query = text;

    let from = 'zh';
    let to = 'yue';
    let str1 = appid + query + salt + key;
    let sign = MD5(str1);

    $.ajax({
        url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
        type: 'get',
        dataType: 'jsonp',
        data: {
            q: query,
            appid: appid,
            salt: salt,
            from: from,
            to: to,
            sign: sign
        },
        success: function (data) {
            //data.trans_result
        }
    });

}

function voice_yue2zh(from, to, voiceData) {
    let voice = fs.readFileSync(voiceData);
    let voiceBuffer = new Buffer(voice);
    let language
    if (from === 'yue'){
        language = 'ct'
    } else if (from === 'zh') {
        language = 'zh'
    }
    client.recognize(voiceBuffer, 'pcm', 16000, {lan: language}).then(function (result)
    {
        let data = [];
        if (result.err_no===0) {
            data = result.result;
        }
        let salt = (new Date).getTime();
        let query = data;

        let str1 = appid + query + salt + key;
        let sign = MD5(str1);

        $.ajax({
            url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
            type: 'get',
            dataType: 'jsonp',
            data: {
                q: query,
                appid: appid,
                salt: salt,
                from: from,
                to: to,
                sign: sign
            },
            success: function (data) {
                //data.trans_result;
            }
        });
    })
}

exports.ts = (req, res, next)=> {
    let data = '';
    req.addListener("data", function (postDataChunk) {
        data += postDataChunk;
    })
    req.addListener("end", function () {
        console.log('voice data finish receiving');
        let dataObject = querystring.parse(data)
        if (dataObject['info']['from']==='text'){
            zh2yue_trans(dataObject['text'])
        } else if (dataObject['info']['from']==='voice'&&dataObject['info']['to']==='mandarin'){
            voice_yue2zh('yue', 'zh', dataObject['file'])
        } else if(dataObject['info']['from']==='voice'&&dataObject['info']['to']==='cantonese') {
            voice_yue2zh('zh', 'yue', dataObject['file'])
        }
    });
}

exports.tts = (req, res, next) => {
    client.text2audio(req.body.text, {spd: 0, per: 4}).then(function (result) {
        if (result.data) {
            fs.writeFileSync('tts.mp3', result.data);
            //发送音频
        }else {
            //合成服务失败
            console.log('语音合成失败：' + JSON.stringify(result));
        }
    }, function (err) {
        console(err);
    });
}