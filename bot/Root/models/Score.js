const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    map: {
        type: Number,
        required: true,
        default: 1
    }
})

module.exports = mongoose.model("Score", Schema);