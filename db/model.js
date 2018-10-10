const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = {
    Tag: mongoose.model('Tag', {
        name: String
    }),
    Comment: mongoose.model('Comment', {
        userId: String,
        foodId: { type: Schema.Types.ObjectId, ref: 'Food' },
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