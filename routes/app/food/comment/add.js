const bodyParser = require('body-parser')
const { Comment, Food } = require.main.require('./db/model')
const mongoose = require('mongoose')

const handle = async (req, res) => {
  const foodId = req.body.foodId
  const userId = req.body.id
  const rate = req.body.rate
  const detail = req.body.detail

  try {
    const comment = await Comment.create({
      userId,
      food: foodId,
      rate,
      detail
    })
    await comment.deepPopulate('food.tags')
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
      })
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
