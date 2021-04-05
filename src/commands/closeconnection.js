const Discord = require('discord.js');
const orderChannelID = '757717773010075649';
const econID = '722877594709524501'
const mongo = require('../mongo');

module.exports = async (message) => {
    mongo().then(async mongoose => {
            if (message.channel.id === orderChannelID && message.author.id === econID) {
                mongoose.connection.close();
                await message.reply("DB connection Closed");
            } else {
                await message.reply("Incorrect ID or Channel");
            }
    })
}