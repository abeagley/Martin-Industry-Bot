const mongoose = require('mongoose');
const reqString = {
    type: String,
    required: true
}

const priceListSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    item: String,
    sell_price: String,
    buy_price: String
},{
    timestamps: true
});

module.exports = mongoose.model('newprices', priceListSchema);