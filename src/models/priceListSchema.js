const mongoose = require('mongoose');
const priceListSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    sell_price: Number,
    buy_price: Number
},{
    timestamps: true
});

module.exports = mongoose.model('priceListSchema', priceListSchema);