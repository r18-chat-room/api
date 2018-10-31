const bodyParser = require('body-parser')
const { User } = require.main.require('./db/model')

const handle = async (req, res) => {
    const tags = req.body.tag
    try {
        const result = await User.findOneAndUpdate({
            id: req.body.id
        }, {
            tag: tags
        }, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })
        res.send({
            success: true
        })
    } catch (e) {
        res.send({
            'error': "No such tag."
        })
    }
}

module.exports = {
    handle
}
