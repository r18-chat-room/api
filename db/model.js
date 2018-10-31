const mongoose = require('mongoose')
const { Schema } = mongoose
const random = require('mongoose-simple-random')
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const tag = new Schema({
    name: String
})

tag.plugin(random)

const Tag = mongoose.model('Tag', tag)

const comment = new Schema ({
    userId: String,
    food: { type: Schema.Types.ObjectId, ref: 'Food' },
    date: { type: Date, default: Date.now },
    rate: Number,
    detail: String,
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
})

comment.plugin(deepPopulate)

const Comment = mongoose.model('Comment', comment)

const user = new Schema({
    id: String,
    favorite: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
    tag: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
})

user.plugin(deepPopulate)

const User = mongoose.model('User', user)

const food = new Schema({
    name: String,
    img: String,
    rating: {
        type: Number,
        default: 0,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    description: String
})

const Food = mongoose.model('Food', food)

module.exports = {
    Tag,
    Comment,
    User,
    Food
}