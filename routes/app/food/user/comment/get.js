const bodyParser = require('body-parser')
const { Comment } = require.main.require('./db/model')

const handle = async (req, res) => {
    const result = await Comment.find({
        userId: req.body.id,
    }).populate('food').populate('tags').deepPopulate('food.tags')
    res.send(result)
}

module.exports = {
    handle
}