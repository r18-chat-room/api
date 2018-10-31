const bodyParser = require('body-parser')
const { User } = require.main.require('./db/model')

const handle = async (req, res) => {
    const result = await User.findOne({
        id: req.body.id
    }).select('tag').deepPopulate('tag')
    res.send({
        tags: result.tag
    })
}

module.exports = {
    handle
};