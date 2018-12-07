const bodyParser = require('body-parser')
const { Comment, Food, Tag } = require.main.require('./db/model')
const mongoose = require('mongoose')
const axios = require('axios')

const handle = async (req, res) => {
  const foodId = req.body.foodId
  const userId = req.body.userId
  const rate = req.body.rate
  const detail = req.body.detail

  try {
    const comment = await Comment.create({
      userId,
      food: foodId,
      rate,
      detail
    })
    const result = await axios.post(global.ml.url + '/v1/backend/food/sync/user/add-comment', {
      "id": userId,
      "food": foodId,
      "rate": rate,
      "detail": detail,
      "commentId": comment.id
    })
    let tags = result.data.tag
    tags = await Promise.all(tags.map(async v => {
      let obj = JSON.parse(JSON.stringify(await Tag.findOne({
        name: v
      })))
      return obj
    }))
    comment.tags = tags
    comment.save()
    await comment.deepPopulate('tags')
    const rateCount = await Comment.aggregate([
      {
        "$match": {
          "food": mongoose.Types.ObjectId(foodId)
        }
      },
      {
        "$group": {
          "_id": "$food",
          "avgRate": { "$avg": '$rate' }
        }
      }])
    const food = await Food.findOneAndUpdate({
      _id: foodId
    }, {
      rating: rateCount[0].avgRate
    }).populate('tags')
    comment.food = JSON.parse(JSON.stringify(food))
    res.send({
      success: true,
      comment: comment
    })
  } catch (e) {
    console.log(e)
    res.send(e.message)
  }
}

module.exports = {
  handle
}
