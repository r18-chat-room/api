const mongoose = require('mongoose')
const model = require('./model')
const connection = require('./connection')

const tags = [
    new model.Tag({
        name: '广式'
    }),
    new model.Tag({
        name: '邹鹏宇牛逼'
    }),
    new model.Tag({
        name: 'zsy辣鸡'
    }),
    new model.Tag({
        name: '丹燕牛逼'
    }),
    new model.Tag({
        name: '大家都牛逼'
    }),
]

model.Tag.insertMany(tags)

const foods = [
    new model.Food({
        name: '怎么说',
        img: 'https://delbertbeta.cc/content/images/2018/09/Konachan.com---270186-gensuke-original-scenic.jpg',
        tags: [tags[0]._id, tags[1]._id],
        description: '你觉得怎么样'
    }),
    new model.Food({
        name: '凉凉',
        img: 'https://delbertbeta.cc/content/images/2018/02/face2-resized.jpg',
        tags: [tags[0]._id, tags[1]._id],
        description: '还行吧'
    })
]

model.Food.insertMany(foods)

const user = new model.User({
    id: '1',
    favorite: [foods[0]._id],
    tag: [tags[0]._id]
})

user.save()

const comment = new model.Comment({
    userId: '1',
    food: foods[0]._id,
    rate: 4,
    detail: '这是一条评论',
    tags: [tags[0]._id]
})

comment.save()