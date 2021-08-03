const Discord = require('discord.js');
module.exports = (message) => {
    console.log("doing alert again")
    const VCchannelID = ('770358282752884776');
    const VCchannel = message.guild.channels.cache.get(VCchannelID);
    VCchannel.join();
}