const axios = require('axios');
const PiBuyReport = require('../models/piPilotBuyPrice');
const PiSellReport = require('../models/piPilotSellPrice');
const mongo = require('../mongo');

let pi = [
    ['lusteringalloy',42001000000],
    ['sheencompound',42001000001],
    ['gleamingalloy',42001000002],
    ['condensedalloy',42001000003],
    ['preciousalloy',42001000004],
    ['motleycompound',42001000005],
    ['fibercomposite',42001000006],
    ['lucentcompound',42001000007],
    ['opulentcompound',42001000008],
    ['glossycompound',42001000009],
    ['crystalcompound',42001000010],
    ['darkcompound',42001000011],
    ['basemetals',42001000020],
    ['heavymetals',42001000021],
    ['noblemetals',42001000022],
    ['reactivemetals',42001000023],
    ['toxicmetals',42001000024],
    ['reactivegas',42001000018],
    ['noblegas',42001000019],
    ['industrialfibres',42001000025],
    ['supertensileplastics',42001000026],
    ['polyaramids',42001000027],
    ['coolant',42001000028],
    ['condensates',42001000029],
    ['constructionblocks',42001000030],
    ['nanites',42001000031],
    ['silicateglass',42001000032],
    ['smartfabunits',42001000033],
    ['heavywater',42002000012],
    ['suspendedplasma',42002000013],
    ['liquidozone',42002000014],
    ['ionicsolutions',42002000015],
    ['oxygenisotopes',42002000016],
    ['plasmoids',42002000017],
]

let piPilotBuyPrices = [];
let piPilotSellPrices = [];
async function getPrices() {
    await mongo().then(async mongoose => {

            for (let i = 0; i < pi.length; i++) {
                await axios.get('https://api.eve-echoes-market.com/market-stats/' + pi[i][1])
                    .then(function (response) {
                        // handle success
                        console.log(response['data'][response['data'].length - 1].sell);
                        let piPilotSellResponse = (Math.round((response['data'][response['data'].length - 1].sell) * 0.75))
                        let piPilotBuyResponse = (Math.round((response['data'][response['data'].length - 1].sell) * 0.85))
                        piPilotSellPrices.push([pi[i][0], piPilotSellResponse])
                        piPilotBuyPrices.push([pi[i][0], piPilotBuyResponse])
                        console.log("SellRes: " + piPilotSellResponse)
                        console.log("BuyRes: " + piPilotBuyResponse)
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            }

            console.log(piPilotBuyPrices)
            console.log(piPilotSellPrices)

            const piBuyReportUpload = new PiBuyReport({
                _id: mongoose.Types.ObjectId(),
                prices: piPilotBuyPrices,
            });
            const piSellReportUpload = new PiSellReport({
                _id: mongoose.Types.ObjectId(),
                prices: piPilotSellPrices,
            });

            await piBuyReportUpload.save()
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

            await piSellReportUpload.save()
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            console.log("pi saved")
    })
}
getPrices()
    .catch(function (error) {
        // handle error
        console.log(error);
    })

