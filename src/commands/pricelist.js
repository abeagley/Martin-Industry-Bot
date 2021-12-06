const Discord = require('discord.js');

const mongoose = require('mongoose');
const mongo = require('../mongo');
const priceList = require('../models/priceListSchema');

module.exports = async (message) => {
    await mongo().then(async function () {
        function getPrices(callback) {
            priceList.find({}).exec((err, getPrice) => {
                if (err) callback(err, null);
                else callback(null, getPrice);
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
