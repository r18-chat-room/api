const hat = require('hat');
const multer = require('multer')
const path = require('path')
const axios = require('axios')
const { Food, User } = require('../../../db/model')
const ml = require('../../../configs/ml')

const upload = multer({
  dest: 'uploads/'
}).single('file')

const handle = async function (req, res) {
  const pathString = path.resolve(req.file.destination + req.file.filename)
  const result = await axios.get(ml.url + '/food-classify/' + pathString)
  const food = await Food.findOne({
    name: result.data.category
  }).populate('tags')
  const user = await User.findOne({
    id: req.body.userId
  })
  const favorite = Array.from(user.favorite)
  food.want = favorite.some(item => item._id == v)
  res.send(food)
}

module.exports = {
  handle,
  upload
}