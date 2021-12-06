const mongoose = require('mongoose');
const reqString = {
    type: String,
    required: true
}

const priceListSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: reqString,
    sell_price: {type: Number},
    buy_price: {type: Number}
},{
    timestamps: true
});

module.exports = mongoose.model('priceListSchema', priceListSchema);