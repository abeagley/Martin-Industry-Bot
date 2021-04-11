const Discord = require('discord.js');
//Set Prices
let quoteTotal = [];
let sellquote = new Discord.MessageEmbed()
//let argTotal = [];


function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}

module.exports = async (message, args) => {
	function getP(callback) {
		const err = false
		let sellPrices = require('../prices/pilotSellPrices');
		if (err) {
			callback(err, null)
		} else {
			callback(null, sellPrices)
		}
	}

	await getP(function (err, sellPrices2) {
		if (err) {
			console.log(err);
		} else {
			console.log(sellPrices2);
			for (let i = 0; i < args.length; i++) {
				for (let j = 0; j < sellPrices2.length; j++) {
					if (args[i].toLowerCase() === sellPrices2[j][0]) {
						//argTotal.push(args[i],args[i]* sellPrices[j][1]);
						quoteTotal.push(args[i + 1] * sellPrices2[j][1]);
					}
					console.log(quoteTotal);
					//console.log(argTotal);
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
	})
}

quoteTotal = [];