const mongoose = require("mongoose");

var Messages = new mongoose.Schema({
    map: {
        type: Number,
        required: true,
        default: 1
    },
    message: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Messages", Messages);