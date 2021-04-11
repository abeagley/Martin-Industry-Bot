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
		return new Promise( resolve => {
			const sellPrices = require('../prices/pilotSellPrices')
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
			if (quoteTotal.length !== 0 && quoteTotal.length === (args.length / 2)) {
				console.log("Done 1")
				resolve();
			}
		})
	}


	function message1() {
		return new Promise(resolve => {
			console.log(quoteTotal)
			const quoteOutput = quoteTotal.reduce((a, b) => a + b, 0);
			if (Number.isInteger(quoteOutput)) {

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
				console.log("Done2")
				resolve();
			}
		})
	}

	function messageSend() {
		return new Promise(resolve => {
			Promise.all([loop(),message1()]).then(() => {
				message.channel.send(sellquote)
				resolve();
			})
		})
	}

	await loop().then(await message1().then(messageSend()))

}
quoteTotal = [];