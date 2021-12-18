const Discord = require('discord.js');

const mongoose = require('mongoose');
const mongo = require('../mongo');
const Report = require('../models/priceListSchema');

module.exports = async (message) =>  {
        await mongo().then(async function () {
            function getSPrices(callback) {
                Report.find({}).exec((err, getPrice) => {
                    if (err) callback(err, null);
                    else callback(null, getPrice);
                })
            }

            let sellPriceList = new Discord.MessageEmbed()
                .setTitle('Sell To Corp Prices')
                .setAuthor(message.member.nickname, message.author.avatarURL())
                .setColor(15105570)
                .addFields({name: args, value: '----------', inline: true})
                .setTimestamp()
                .setFooter('Donate isk to corp and await mats')
            ;

            await getSPrices(async function (err, priceResult) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(priceResult);
                    message.channel.send(sellPriceList);
                }
            })
        })

}