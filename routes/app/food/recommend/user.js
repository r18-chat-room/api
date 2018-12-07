const bodyParser = require('body-parser')
const { Food, User, Comment } = require.main.require('./db/model')
const axios = require('axios')

const handle = async (req, res) => {
  const data = {
    id: req.body.id
  }
  const user = await User.findOne({
    id: req.body.id
  }).populate('favorite')
  let favorite = Array.from(user.favorite)
  const result = await axios.post(global.ml.url + '/v1/backend/food/recommend/id', data)
  const foods = await Promise.all(result.data.foods.map(async v => {
    let obj = JSON.parse(JSON.stringify(await Food.findOne({
      _id: v
    }).populate('tags')))
    obj.want = favorite.some(item => item._id === v)
    console.log(favorite, v)
    if (await Comment.findOne({
      userId: req.body.id,
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