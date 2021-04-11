const mongoose = require('mongoose');

const pilotSellPricesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prices: Array,
},{
    timestamps: true
});

module.exports = mongoose.model('pilotSellPrices', pilotSellPricesSchema);