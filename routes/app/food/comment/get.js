const bodyParser = require('body-parser')
const { Comment } = require.main.require('./db/model')

const handle = async (req, res) => {
    try {
        const myComment = await Comment.findOne({
            food: req.body.foodId,
            userId: req.body.userId
        }).deepPopulate('tags')
        let sortObj = ''
        switch(req.body.order) {
            case 'top': sortObj = 'rate'; break;
            case 'recently': sortObj = 'date'; break;
            case 'worst': sortObj = '-rate'; break;
            default: sortObj = 'date'; break;
        }
        const comments = await Comment.find({
            food: req.body.foodId
        }).sort(sortObj).deepPopulate('tags').deepPopulate("food.tags")
        const result = {
            myComment,
            comments
        }
        res.send(result)
    }
    catch(e) {
        res.send(e)
    }
}

module.exports = {
    handle
};