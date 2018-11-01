const bodyParser = require('body-parser')
const { User } = require.main.require('./db/model')

const handle = async (req, res) => {
    const tags = req.body.tag
    if (tags.length >= 0) {
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
            console.log(e)
            res.send({
                'error': "No such tag."
            })
        }
    }
    else {
        res.send({
            error: "Tags must be defined."
        })
    }
}

module.exports = {
    handle
}
