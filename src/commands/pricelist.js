const mongo = require('../mongo');
const priceList = require('../models/priceListSchema');

module.exports = async (message) => {
    await mongo().then(async function () {
        function getPrices(callback) {
            priceList.findOne().sort({createdAt: -1}).limit(1).exec((err, getPrice) => {
                if (err) callback(err, null);
                else callback(null, getPrice);
                console.log(getPrice);
            })
        }

        await getPrices(async function (err, priceResult) {
            if (err) {
                console.log(err);
            } else {
                console.log(priceResult);
                message.reply("`​`​`" + priceResult + "`​`​`");
            }
        })
    })

}
