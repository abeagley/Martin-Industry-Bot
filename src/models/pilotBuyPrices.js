const mongoose = require('mongoose');

const pilotBuyPricesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prices: Array,
},{
    timestamps: true
});

module.exports = mongoose.model('pilotBuyPrices', pilotBuyPricesSchema);