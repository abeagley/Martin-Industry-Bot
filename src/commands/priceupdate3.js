const Discord = require('discord.js');

const econID = '722877594709524501'
const mongo = require('../mongo');

module.exports = async (message) => {
    mongo().then(async mongoose => {
            if ( message.author.id === econID) {

                await require('../database/getPiPrices');
                await message.reply("Pi prices Updated, please run !priceupdate4");
            } else {
                await message.reply("Incorrect ID or Channel");
            }
    })
}