const bodyParser = require('body-parser')
const { Food } = require.main.require('./db/model')
const axios = require('axios')

const handle = async (req, res) => {
  const result = await axios.post(global.ml.url + '/v1/backend/food/recommend/id', {
    id: req.body.userId
  })
  const foods = await Promise.all(result.data.foods.map(async v => {
    let obj = JSON.parse(JSON.stringify(await Food.findOne({
      _id: v
    }).populate('tags')))
    return obj
  }))
  res.send({
    foods
  })
}

module.exports = {
  handle
}