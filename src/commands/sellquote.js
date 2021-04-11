const Discord = require('discord.js');
//Set Prices
let quoteTotal = [];
let sellquote = new Discord.MessageEmbed()
//let argTotal = [];


function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}

module.exports = async (message, args) => {
	const sellPrices = require('../prices/pilotSellPrices')

	function loop() {
		return new Promise(async (resolve)  =>  {
			async function run() {
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
			}
			try {
				await run()
				console.log("1")
				await sendM()
				resolve();
			}
			catch (error1) {
				console.log(error1)
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

	async function callback1() {
		try {
			await loop()
			console.log("2")
		}
		catch (error) {
			console.log(error)
		}
	}

	async function sendM() {
		try {
			await messageSend()
			console.log("5")
		}
		catch (err) {
			console.log(err)
		}
	}

	await callback1()

}
quoteTotal = [];