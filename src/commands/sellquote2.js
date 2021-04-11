const Discord = require('discord.js');
//Set Prices
let quoteTotal = [];
let sellquote = new Discord.MessageEmbed()
//let argTotal = [];


function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}

module.exports = (message, args) => {
	const sellPrices = require('../prices/pilotSellPrices')

	for (let i = 0; i < args.length; i++) {
		for (let j = 0; j < sellPrices.length; j++) {
			if (args[i].toLowerCase() === sellPrices[j][0]) {
				//argTotal.push(args[i],args[i]* sellPrices[j][1]);
				quoteTotal.push(args[i + 1] * sellPrices[j][1]);
			}
		}
	}

	let quoteOutput = quoteTotal.reduce((a, b) => a + b, 0);

	sellquote = new Discord.MessageEmbed()
		.setTitle('Quote')
		.setAuthor(message.member.nickname, message.author.avatarURL())
		.setColor(15105570)
		.addFields(
			//{name: 'Items:', value: argTotal},
			{name: 'Total isk', value: formatMoney(quoteOutput)}
		)
		.setTimestamp()
		.setFooter('Oh look it worked')
	;

	message.channel.send(sellquote)
}
quoteTotal = [];