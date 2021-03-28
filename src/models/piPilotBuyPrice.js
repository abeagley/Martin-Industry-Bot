const mongoose = require('mongoose');

const piPilotBuyPriceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prices: Array,
},{
    timestamps: true
});

module.exports = mongoose.model('piPilotBuyPrice', piPilotBuyPriceSchema);