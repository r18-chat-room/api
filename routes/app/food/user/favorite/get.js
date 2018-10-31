const bodyParser = require('body-parser')
const { User } = require.main.require('./db/model')

const handle = async (req, res) => {
    const result = await User.findOne({
        id: req.body.id
    }).select('favorite').deepPopulate('favorite.tags')
    // const response = {
    //     foods
    // }
    res.send(result)
}

module.exports = {
    handle
};