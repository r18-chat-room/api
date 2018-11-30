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
        await axios.post(global.ml.url + '/v1/backend/food/sync/user/add-favorite', {
            id: userId,
            food: foodId
        })
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
