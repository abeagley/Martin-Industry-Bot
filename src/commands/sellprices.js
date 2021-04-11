const Discord = require('discord.js');
const orderChannelID = '756565959073857679';
const econID = '722877594709524501'
const mongoose = require('mongoose');
const mongo = require('../mongo');
const Report = require('../models/pilotSellPrices');

module.exports = async (message) =>  {
    if (message.channel.id === orderChannelID && message.author.id === econID ) {
        await mongo().then(async function () {
            function getSPrices(callback) {
                Report.findOne().sort({createdAt: -1}).limit(1).exec((err, getPrice) => {
                    if (err) callback(err, null);
                    else callback(null, getPrice);
                })
            }

            let sPrices = [];
            await getSPrices(async function (err, priceResult) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(priceResult);
                    sPrices = priceResult.prices;
                    console.log(sPrices);
                    message.reply("`​`​`" + sPrices + "`​`​`");
                }
            })
        })
    }
    else {
        await message.reply("Incorrect ID or Channel");
    }
}