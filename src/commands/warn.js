const Discord = require('discord.js');
module.exports = (message, args, client) => {
    console.log("doing alert again")
    const VCchannelID = ('770358282752884776');
    const VCchannel = message.guild.channels.cache.get(VCchannelID);
    VCchannel.join();
    message.channel.send(`<@&770332037763825664> ${args}`, {
        tts: true
    });
    const broadcast = message.client.voice.createBroadcast();
    broadcast.play('./src/assets/92a61070-f4a5-11eb-bdb4-d3cdde3ec4b5.mp3', { volume: 1 });
}