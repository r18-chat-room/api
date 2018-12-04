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
            const tagContent = await result.deepPopulate('tag.name')
            const data = {
                id: req.body.id,
                tags: JSON.parse(JSON.stringify(tagContent.tag))
            }
            console.log(data)
            const mlResponse = await axios.post(global.ml.url + '/v1/backend/food/sync/user/edit-tag', data)
            console.log(mlResponse.data)
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
