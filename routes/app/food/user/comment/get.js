const bodyParser = require('body-parser')
const { Comment } = require.main.require('./db/model')

const handle = async (req, res) => {
    const result = await Comment.find({
        userId: req.body.userId,
    }).populate('foodId')
    res.send(result)
}

module.exports = {
    handle
}