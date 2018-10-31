const bodyParser = require('body-parser')
const { Tag } = require.main.require('./db/model')

const getRandom = count => {
    return new Promise((resolve, reject) => {
        Tag.findRandom({}, {}, {
            limit: count
        }, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    })
}

const handle = async (req, res) => {
    const result = await getRandom(req.body.count)
    res.send(result)
}

module.exports = {
    handle
};