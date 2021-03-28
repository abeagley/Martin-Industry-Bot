const mongoose = require('mongoose');

const piPilotSellPriceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prices: Array,
},{
    timestamps: true
});

module.exports = mongoose.model('piPilotSellPrice', piPilotSellPriceSchema);