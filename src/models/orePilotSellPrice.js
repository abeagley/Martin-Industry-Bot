const mongoose = require('mongoose');

const orePilotSellPriceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prices: Array,
},{
    timestamps: true
});

module.exports = mongoose.model('orePilotSellPrice', orePilotSellPriceSchema);