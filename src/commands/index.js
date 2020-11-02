const ping = require('./ping.js');
const quote = require('./quote.js');
const ore = require('./ore.js');


const guildID = '766431988302348349';
const channelID = '766433728716341248';

const commands = {
    ping,
    quote,
    ore
}
 
module.exports = async (message) => {
    console.log(message);
    if (message.guild.id === guildID && message.channel.id === channelID) {
        const args = message.content.split(' ');
        if (args.length == 0 || args[0].charAt(0) !== '!') return;
        const command = args.shift().substr(1);
        if (Object.keys(commands).includes(command)) {
            commands[command](message, args);
        }
	}
}