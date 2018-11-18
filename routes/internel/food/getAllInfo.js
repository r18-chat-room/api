const bodyParser = require('body-parser')
const { Food, Comment } = require.main.require('./db/model')

const handle = async (req, res) => {
  let result = await Food.find({
  }).populate('tags')

  result = JSON.parse(JSON.stringify(result))

  result = await Promise.all(result.map(async v => {
    v.comment = JSON.parse(JSON.stringify(await Comment.find({
      food: v._id
    }).populate('tags')))
    return v
  }))

  res.send(result)
}

module.exports = {
  handle
};