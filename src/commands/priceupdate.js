const Discord = require('discord.js');
const orderChannelID = '757717773010075649';
const econID = '722877594709524501'
const mongoose = require('mongoose');

async function updatePrices(message) {
    if (message.channel.id === orderChannelID && message.author.id === econID ) {

        await require('../database/getMineralPrices');
        await require('../database/getOrePrices');
        await require('../database/getPiPrices');

        await module.exports = async (message) => {
            await message.reply("Prices Updated");
        }
    }
    else {
        module.exports = async (message) => {
            await message.reply("Incorrect ID or Channel");
        }
    }
}

updatePrices();