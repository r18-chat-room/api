const bodyParser = require('body-parser')
const { Comment } = require.main.require('./db/model')
const axios = require('axios')

const handle = async (req, res) => {
    const result = await Comment.deleteOne({
        userId: req.body.userId,
        _id: req.body.commentId
    })
    await axios.post(global.ml.url + '/v1/backend/food/sync/user/delete-comment', {
        id: req.body.userId,
        commentId: req.body.commentId
    })
    res.send({
        "success": true
    })
}

module.exports = {
    handle
}