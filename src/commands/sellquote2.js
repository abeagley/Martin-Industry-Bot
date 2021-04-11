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

	const waitFor = (ms) => new Promise( r=> setTimeout(r, ms));

	async function
	asyncForEach(array, callback) {
		for (let j = 0; j < array.length; j++) {
			await callback(Array[j], j, array);
		}
	}

	const start = async () => {
		for (let i = 0; i < args.length; i++) {
		await asyncForEach(sellPrices, async (num) => {
			await waitFor(50)
			console.log(num)
			console.log(num[j])
				if (args[i].toLowerCase() === num[j][0]) {
					//argTotal.push(args[i],args[i]* sellPrices[j][1]);
					quoteTotal.push(args[i + 1] * num[j][1]);
				}
			})
		}
	}

	const two = () => {
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
	await start().then(await two())

}
quoteTotal = [];