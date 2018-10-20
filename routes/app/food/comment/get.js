const bodyParser = require('body-parser')
const { Comment } = require.main.require('./db/model')

const handle = async (req, res) => {
    try {
        const myComment = await Comment.findOne({
            foodId: req.body.foodId,
            userId: req.body.userId
        })
        const sortObj = ''
        switch(req.body.order) {
            case 'top': sortObj = 'rate'; break;
            case 'recently': sortObj = 'date'; break;
            case 'worst': sortObj = '-rate'; break;
            default: sortObj = 'date'; break;
        }
        const comments = await Comment.find({
            foodId: req.body.foodId
        }).sort(sortObj)
        res.send({
            myComment,
            comments
        })
    }
    catch(e) {
        res.send(e)
    }
}

module.exports = {
    handle
};