const mongoose = require('mongoose');

const mineralPriceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prices: Array,
},{
    timestamps: true
});

module.exports = mongoose.model('mineralPrice', mineralPriceSchema);