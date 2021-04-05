const MineralReport = require('../models/mineralPrice');
const PiReport = require('../models/piPilotBuyPrice')
const mongo = require('../mongo');

async function getOrePrice() {
    await mongo().then(async function () {

        function getOreValues(callback) {
            MineralReport.findOne().sort({createdAt: -1}).limit(1).exec((err, getOreResult) => {
                if (err) callback(err, null);
                else callback(null, getOreResult);
            })
        }

        function getPiValues(callback) {
            PiReport.findOne().sort({createdAt: -1}).limit(1).exec((err, getPiResult) => {
                if (err) callback(err, null);
                else callback(null, getPiResult);
            })
        }

        let ore1Prices = [];
        await getOreValues(async function (err, getOreResult2) {
            if (err) {
                console.log(err);
            } else {
                console.log(getOreResult2);
                ore1Prices = getOreResult2.prices;
                console.log(ore1Prices);
            }
            await getPiValues(async function (err, getPiResult2) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(getPiResult2);
                    let pi1Prices = getPiResult2.prices;
                    console.log(pi1Prices);
                    let buyPrices = ore1Prices.concat(pi1Prices);
                    console.log(buyPrices);
                    module.exports = buyPrices;
                }
            })
        })
    })
}
getOrePrice();

