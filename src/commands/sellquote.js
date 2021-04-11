const Discord = require('discord.js');
const sellPrices = require('../prices/pilotSellPrices')
//Set Prices
let quoteTotal = [];
let sellquote = new Discord.MessageEmbed()
//let argTotal = [];


function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}

module.exports = async (message, args) => {
	function loop() {
		return new Promise(async (resolve, reject)  =>  {
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
			console.log("Quotetotal length" + quoteTotal.length)
			console.log("Arg length over 2" + (args.length / 2))
			if (quoteTotal.length !== 0 && quoteTotal.length === (args.length / 2)) {
				console.log("Done 1")
				resolve();
			}
			else {
				console.log("rejected")
				reject();
			}

		})
	}

	function messageSend() {
		let quoteOutput = quoteTotal.reduce((a, b) => a + b, 0);
		console.log(quoteOutput)
		console.log("3")
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
		console.log("4")
		message.channel.send(sellquote)
	}

	async function callback1(result) {
		try {
			await loop(result)
			console.log("2")
			console.log(result)
		}
		catch (error) {
			console.log(error)
		}
	}

	await callback1().then(messageSend());

}
quoteTotal = [];