const bodyParser = require('body-parser')
const { User } = require.main.require('./db/model')

const handle = async (req, res) => {
    const foodId = req.body.food
    const userId = req.body.id
    try {
        const user = await User.findOneAndUpdate({
            id: userId
        }, {}, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })
        user.favorite.remove(foodId)
        await user.save()
        res.send({
            success: true
        })
    } catch (e) {
        console.log(e)
        res.send(e.message)
    }
}

module.exports = {
    handle
}
