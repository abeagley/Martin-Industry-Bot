const quote = require('./quote.js');
const ore = require('./ore.js');


const guildID = '612667368744812563';
const channelID = '756565959073857679';

const commands = {
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