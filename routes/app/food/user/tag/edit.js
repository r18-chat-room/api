const bodyParser = require('body-parser')
const { User } = require.main.require('./db/model')
const axios = require('axios')

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
            const tags = result.populate('tag.name')
            await axios.post(global.ml.url + '/v1/backend/food/sync/user/edit-tag', {
                id: req.body.id,
                tags: tags.tag
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
