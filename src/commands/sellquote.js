const Discord = require('discord.js');
//Set Prices
let quoteTotal = [];
let sellquote = new Discord.MessageEmbed()
//let argTotal = [];

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}


module.exports = async (message, args) => {
	function loop() {
		return new Promise((resolve, reject) => {
			const sellPrices = require('../prices/pilotSellPrices')
			const error = false;
			for (let i = 0; i < args.length; i++) {
				for (let j = 0; j < sellPrices.length; j++) {
					if (args[i].toLowerCase() === sellPrices[j][0]) {
						//argTotal.push(args[i],args[i]* sellPrices[j][1]);
						quoteTotal.push(args[i + 1] * sellPrices[j][1]);
					}
					console.log(quoteTotal);
					//console.log(argTotal);
				}
			}
			if (!error) {
				console.log("Done1")
				resolve();
			} else {
				reject();
			}
		})
	}

	function message1() {
		return new Promise((resolve, reject) => {
			const error2 = false;
			console.log(quoteTotal)
			const quoteOutput = quoteTotal.reduce((a, b) => a + b, 0);

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
			if (!error2) {
				console.log("Done2")
				resolve();
			} else {
				reject();
			}
		})
	}

	await Promise.all([loop(), message1()]).then(message.channel.send(sellquote))

}
quoteTotal = [];