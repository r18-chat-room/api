const mongoose = require('mongoose')
const model = require('./model')
const connection = require('./connection')

// setTimeout(() => {
//     const tag = new model.Tag({
//         id: 0,
//         name: '广式'
//     })
//     console.log(tag._id)
//     tag.save()
// }, 1000)

setTimeout(async () => {
    const result = await model.Tag.find()
    console.log(result)
}, 2000)