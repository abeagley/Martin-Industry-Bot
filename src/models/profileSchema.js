const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}
const profileSchema = new mongoose.Schema({
    userId: reqString,
    guildId: reqString,
    coins: { type: Number, default: 0, required: true},
    bank: { type: Number}
})

module.exports = mongoose.model("ProfileModels", profileSchema);