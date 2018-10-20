const mongoose = require('mongoose')
const config = require('../configs/db')

mongoose.connect(config.url, {
    useNewUrlParser: true
})

module.exports = mongoose.connection