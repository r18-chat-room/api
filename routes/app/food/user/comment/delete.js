const bodyParser = require('body-parser')
const { Comment } = require.main.require('./db/model')

const handle = async (req, res) => {
    const result = await Comment.deleteOne({
        userId: req.body.userId,
        _id: req.body.commentId
    })
    res.send({
        "success": true
    })
}

module.exports = {
    handle
}