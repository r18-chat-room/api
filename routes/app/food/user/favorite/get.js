const bodyParser = require('body-parser')
const { User } = require.main.require('./db/model')

const handle = async (req, res) => {
    const result = await User.find({
        id: req.body.id
    }).select('favorite')
    res.send(result)
}

module.exports = {
    handle
};