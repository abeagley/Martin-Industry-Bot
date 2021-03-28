const axios = require('axios');
const mongoose = require('mongoose');
const Report = require('../models/mineralPrice');

let minerals = [
    [41000000000, 'tritanium'],
    [41000000002, 'pyerite'],
    [41000000003, 'mexallon'],
    [41000000004, 'isogen'],
    [41000000005, 'nocxium'],
    [41000000006, 'zydrine'],
    [41000000007, 'megacyte'],
    //[41000000008, 'morphite'],
]

let mineralPrices = [];
async function getPrices() {
    for (let i = 0; i < minerals.length; i++) {
        await axios.get('https://api.eve-echoes-market.com/market-stats/' + minerals[i][0])
            .then(function (response) {
                // handle success
                console.log(response['data'][response['data'].length - 1].sell);
                let mineralResponse = (Math.round((response['data'][response['data'].length - 1].sell) * 0.85))
                mineralPrices.push([minerals[i][1],mineralResponse])
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


}
getPrices()
    .catch(function (error) {
        // handle error
        console.log(error);
    })

