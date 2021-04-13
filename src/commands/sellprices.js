const Discord = require('discord.js');
const orderChannelID = '756565959073857679';
const mongoose = require('mongoose');
const mongo = require('../mongo');
const Report = require('../models/pilotSellPrices');

module.exports = async (message) =>  {
    if (message.channel.id === orderChannelID) {
        await mongo().then(async function () {
            function getSPrices(callback) {
                Report.findOne().sort({createdAt: -1}).limit(1).exec((err, getPrice) => {
                    if (err) callback(err, null);
                    else callback(null, getPrice);
                })
            }

            await getSPrices(async function (err, priceResult) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(priceResult);
                    message.reply("`​`​`" + priceResult + "`​`​`");
                }
            })
        })
    }
    else {
        await message.reply("Incorrect ID or Channel");
    }
}