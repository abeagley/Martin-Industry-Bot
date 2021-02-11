/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */

const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    time: String,
    nickname: String,
    username: String,
    userID: String,
    isk: Number,
});

module.exports = mongoose.model('orevalues', reportSchema);