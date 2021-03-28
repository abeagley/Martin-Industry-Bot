const axios = require('axios');
const mongoose = require('mongoose');
const PiBuyReport = require('../models/piPilotBuyPrice');
const PiSellReport = require('../models/piPilotSellPrice');

let pi = [
    ['lusteringAlloy',42001000000],
    ['sheenCompound',42001000001],
    ['gleamingAlloy',42001000002],
    ['condensedAlloy',42001000003],
    ['preciousAlloy',42001000004],
    ['motleyCompound',42001000005],
    ['fiberComposite',42001000006],
    ['lucentCompound',42001000007],
    ['opulentCompound',42001000008],
    ['glossyCompound',42001000009],
    ['crystalCompound',42001000010],
    ['darkCompound',42001000011],
    ['baseMetals',42001000020],
    ['heavyMetals',42001000021],
    ['nobleMetals',42001000022],
    ['reactiveMetals',42001000023],
    ['toxicMetals',42001000024],
    ['reactiveGas',42001000018],
    ['nobleGas',42001000019],
    ['industrialFibres',42001000025],
    ['supertensilePlastics',42001000026],
    ['polyaramids',42001000027],
    ['coolant',42001000028],
    ['condensates',42001000029],
    ['constructionBlocks',42001000030],
    ['nanites',42001000031],
    ['silicateGlass',42001000032],
    ['smartfabUnits',42001000033],
    ['heavyWater',42002000012],
    ['suspendedPlasma',42002000013],
    ['liquidOzone',42002000014],
    ['ionicSolutions',42002000015],
    ['oxygenIsotopes',42002000016],
    ['plasmoids',42002000017],
]

let piPilotBuyPrices = [];
let piPilotSellPrices = [];
async function getPrices() {

    for (let i = 0; i < pi.length; i++) {
        await axios.get('https://api.eve-echoes-market.com/market-stats/' + pi[i][1])
            .then(function (response) {
                // handle success
                console.log(response['data'][response['data'].length - 1].sell);
                let piPilotSellResponse = (Math.round((response['data'][response['data'].length - 1].sell) * 0.75))
                let piPilotBuyResponse = (Math.round((response['data'][response['data'].length - 1].sell) * 0.85))
                piPilotSellPrices.push([pi[i][0],piPilotSellResponse])
                piPilotBuyPrices.push([pi[i][0],piPilotBuyResponse])
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

}
getPrices()
    .catch(function (error) {
        // handle error
        console.log(error);
    })

