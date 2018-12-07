const bodyParser = require('body-parser')
const { Food, User, Comment } = require.main.require('./db/model')
const axios = require('axios')

const handle = async (req, res) => {
  const data = {
    id: req.body.id
  }
  const user = User.findOne({
    id: id
  }).populate('favorite')
  const result = await axios.post(global.ml.url + '/v1/backend/food/recommend/id', data)
  const foods = await Promise.all(result.data.foods.map(async v => {
    let obj = JSON.parse(JSON.stringify(await Food.findOne({
      _id: v
    }).populate('tags')))
    if (user.favorite.findOne({
      _id: obj._id
    })) {
      obj.want = true
    } else {
      obj.want = false
    }
    if (Comment.findOne({
      userId: id,
      food: obj._id
    })) {
      obj.commented = true;
    } else {
      obj.commented = false;
    }
    return obj
  }))
  res.send({
    foods
  })
}

module.exports = {
  handle
}