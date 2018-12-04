const bodyParser = require('body-parser')
const { User } = require.main.require('./db/model')
const axios = require('axios')

const handle = async (req, res) => {
    const foodId = req.body.food
    const userId = req.body.id
    try {
        const user = await User.findOneAndUpdate({
            id: userId
        }, {
            $push: {
                favorite: foodId
            }
        }, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })
        const data = {
            id: userId,
            food: foodId
        }
        console.log(data)
        let result = await axios.post(global.ml.url + '/v1/backend/food/sync/user/add-favorite', data)
        console.log(result)
        res.send({
            success: true
        })
    } catch (e) {
        res.send(e.message)
    }
}

module.exports = {
    handle
}
