const mongoose = require('mongoose');
const priceListSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
},{
    timestamps: true
});

module.exports = mongoose.model('priceListSchema', priceListSchema);