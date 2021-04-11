const Discord = require('discord.js');
const mongo = require('../mongo');
//Set Prices
let quoteTotal = [];
let sellquote = new Discord.MessageEmbed()
const Report = require('../models/pilotSellPrices');
//let argTotal = [];


function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}

module.exports = async (message, args) => {
	await mongo().then(async function () {
		function getSPrices(callback) {
			Report.findOne().sort({createdAt: -1}).limit(1).exec((err, getPrice) => {
				if (err) callback(err, null);
				else callback(null, getPrice);
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

		let sPrices = [];
		await getSPrices(async function (err, priceResult) {
			if (err) {
				console.log(err);
			} else {
				console.log(priceResult);
				sPrices = priceResult.prices;
				console.log(sPrices);
				for (let i = 0; i < args.length; i++) {
					for (let j = 0; j < sPrices.length; j++) {
						if (args[i].toLowerCase() === sPrices[j][0]) {
							//argTotal.push(args[i],args[i]* sellPrices[j][1]);
							quoteTotal.push(args[i + 1] * sPrices[j][1]);
						}
						console.log(quoteTotal);
						//console.log(argTotal);
					}
				}
			}
			await messageSend()
		})

	})

}
quoteTotal = [];