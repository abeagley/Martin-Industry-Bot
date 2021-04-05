const axios = require('axios');
const Report = require('../models/mineralPrice');
const mongo = require('../mongo')

let minerals = [
    ['tritanium',41000000000],
    ['pyerite',41000000002],
    ['mexallon',41000000003],
    ['isogen',41000000004],
    ['nocxium',41000000005],
    ['zydrine',41000000006],
    ['megacyte',41000000007],
    //['morphite',41000000008,],
]

let mineralPrices = [];
async function getPrices() {
    await mongo().then(async mongoose => {
        try {

            for (let i = 0; i < minerals.length; i++) {
                await axios.get('https://api.eve-echoes-market.com/market-stats/' + minerals[i][1])
                    .then(function (response) {
                        // handle success
                        console.log(response['data'][response['data'].length - 1].sell);
                        let mineralResponse = (Math.round((response['data'][response['data'].length - 1].sell) * 0.85))
                        mineralPrices.push([minerals[i][0], mineralResponse])
                        console.log("mineralRes:" + mineralResponse)
                        console.log("mineralPrices:" + mineralPrices)
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            }

            console.log(mineralPrices)

            const report = new Report({
                _id: mongoose.Types.ObjectId(),
                prices: mineralPrices,
            });

            await report.save()
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

        } finally {
            mongoose.connection.close()
        }
    })
}
getPrices()
    .catch(function (error) {
        // handle error
        console.log(error);
    })

