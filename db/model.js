const mongoose = require('mongoose')
const { Schema } = mongoose
const random = require('mongoose-simple-random')

const tag = new Schema({
    name: String
})

tag.plugin(random)

const Tag = mongoose.model('Tag', tag)

module.exports = {
    Tag,
    Comment: mongoose.model('Comment', {
        userId: String,
        food: { type: Schema.Types.ObjectId, ref: 'Food' },
        date: { type: Date, default: Date.now },
        rate: Number,
        detail: String,
        tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
    }),
    User: mongoose.model('User', {
        id: String,
        favorite: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
        tag: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
    }),
    Food: mongoose.model('Food', {
        name: String,
        img: String,
        tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
        description: String
    })
}