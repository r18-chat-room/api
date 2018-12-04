const bodyParser = require('body-parser')
const { Tag, User } = require.main.require('./db/model')
const axios = require('axios')

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
    if (req.body.userId) {
        const user = await User.findOrCreate({
                id: req.body.userId
        })
        // const result = await User.findOneAndUpdate({
        //     id: req.body.userId
        // }, {}, {
        //     upsert: true,
        //     new: true,
        //     setDefaultsOnInsert: true
        // })
        if (user.created) {
            let result = await axios.post(global.ml.url + '/v1/backend/food/sync/user/add', {
                id: req.body.userId
            })
            console.log(result)
        }
    }
    const result = await getRandom(req.body.count)
    res.send(result)
}

module.exports = {
    handle
};