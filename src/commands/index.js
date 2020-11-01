//Require Commands
const quote = require('./quote.js');
const ore = require('./ore.js');
const ping = require('./ping');

//Test Discord ID
const guildID = '766431988302348349';
const channelID = '766433728716341248';

//Commands List
const commands = {
    quote,
    ore,
    ping
}
 
// Command sorter
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
    
    else console.log('uh oh');
}