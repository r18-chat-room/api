const bodyParser = require('body-parser')
const { Comment } = require.main.require('./db/model')

const handle = async (req, res) => {
    try {
        const myComment = await Comment.findOne({
            food: req.body.foodId,
            userId: req.body.userId
        }).populate('tags').deepPopulate("food.tags")
        let sortObj = ''
        switch (req.body.order) {
            case 'top': sortObj = 'rate'; break;
            case 'recently': sortObj = 'date'; break;
            case 'worst': sortObj = '-rate'; break;
            default: sortObj = 'date'; break;
        }
        const comments = await Comment.find({
            food: req.body.foodId
        }).sort(sortObj).populate('tags').deepPopulate("food.tags")
        const result = {
            myComment: JSON.parse(JSON.stringify(myComment)),
            comments: JSON.parse(JSON.stringify(comments))
        }
        res.send(result)
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
}

module.exports = {
    handle
};