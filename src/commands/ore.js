const Discord = require('discord.js');

const mongoose = require('mongoose');
const Report = require('../models/report.js');
const mongo = require('../mongo');
const sellReport = require('../models/priceListSchema');

// Set Sell Prices

let quoteTotalTwo = [];
let oreArray = [];
let oreNumber = [];
let reportArray = [];

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}


module.exports = async (message, args) =>  {
	if (args.length < 2) {
		return message.reply('No Values Input :pensive: Try \'!ore veldspar 1000 scordite 1000...\'');
	}
	else if (args.length > 21) {return message.reply('Too many values :pensive: Keep it to 10 or less ')}
	else {
		await mongo().then(async function () {
			function getSPrices(callback) {
				sellReport.find({}).exec((err, getPrice) => {
					if (err) callback(err, null);
					else callback(null, getPrice);
				})
			}

			let sPrices = [];
			await getSPrices(async function (err, priceResult) {
				if (err) {
					console.log(err);
				} else {
					//console.log(priceResult);
					sPrices = priceResult;
					//console.log(sPrices);

					// Loop through message for matching terms and add them to quoteTotal
					for (let i = 0; i < args.length; i++) {
						for (let j = 0; j < sPrices.length; j++) {
							if (args[i].toLowerCase() === sPrices[j].item) {
								reportArray.push(args[i])
								console.log(reportArray)
								let sellPrice = parseFloat(sPrices[j].sell_price)
								console.log(sPrices[j].sell_price)
								reportArray.push(sellPrice)
								console.log(reportArray)
								reportArray.push(args[i+1])
								console.log(reportArray)
								quoteTotalTwo.push(args[i + 1] * sellPrice);
								reportArray.push(args[i + 1] * sellPrice)
								console.log(reportArray);
							}
							console.log(quoteTotalTwo);
						}
					}

					for (let l = 0; l < args.length; l += 2) {
						oreArray.push(args[l]);
					}
					console.log(oreArray);

					for (let m = 1; m < args.length; m += 2) {
						oreNumber.push(args[m]);
					}
					console.log(oreNumber);

					let quoteOutputTwo = quoteTotalTwo.reduce((a, b) => a + b, 0);
					quoteOutputTwo = Math.round(quoteOutputTwo)

					let errorVal = (args.length / 2);
					let reportVal = (reportArray.length / 4)
					let errorName = "";

					if (errorVal === reportVal){
						errorName = "No"
					}
					else {
						errorName = "Yes"
					}

					const disagree1 = '❌';
					const agree1 = '☑️';


					let oreInvoice = new Discord.MessageEmbed()
						.setTitle('Status: Sell Ore Request')
						.setAuthor(message.member.nickname, message.author.avatarURL())
						.setColor(15105570)
						.addFields({name: reportArray[2] + " " + reportArray[0] + " @ " + reportArray[1] , value: reportArray[3], inline: true},
							{name: reportArray[6] + " " + reportArray[4] + " @ " + reportArray[5] , value: reportArray[7], inline: true},
							{name: reportArray[10] + " " + reportArray[8] + " @ " + reportArray[9] , value: reportArray[11], inline: true},
							{name: reportArray[14] + " " + reportArray[12] + " @ " + reportArray[13] , value: reportArray[15], inline: true},
							{name: reportArray[18] + " " + reportArray[16] + " @ " + reportArray[17] , value: reportArray[19], inline: true},
							{name: reportArray[22] + " " + reportArray[20] + " @ " + reportArray[21] , value: reportArray[23], inline: true},
							{name: reportArray[26] + " " + reportArray[24] + " @ " + reportArray[25] , value: reportArray[27], inline: true},
							{name: reportArray[30] + " " + reportArray[28] + " @ " + reportArray[29] , value: reportArray[31], inline: true},
							{name: reportArray[34] + " " + reportArray[32] + " @ " + reportArray[33] , value: reportArray[35], inline: true},
							{name: reportArray[38] + " " + reportArray[36] + " @ " + reportArray[37] , value: reportArray[39], inline: true},
							{name: 'Total isk', value: formatMoney(piOutput)}, {name: "Errors?", value: errorName }
						)
						.setTimestamp()
						.setFooter('Please ping a director asking where contract should go to request')
					;

					message.channel.send(oreInvoice).then(msg => {
						msg.react(agree1);
						msg.react(disagree1);
						message.reply(`Please ping a director asking where contract should go to request ${formatMoney(quoteOutputTwo)} isk`);

						let rUser = message.member;
						let rAuthor = message.author;

						const report = new Report({
							_id: mongoose.Types.ObjectId(),
							time: message.createdTimestamp,
							nickname: rUser.nickname,
							username: rAuthor.username,
							userID: rUser.id,
							isk: quoteOutputTwo,
						});

						report.save();


						const agreeDisagree = (reaction, user) => reaction.message.guild.member(user).roles.cache.has('773244425291300896');
						const agreeOrDisagree = msg.createReactionCollector(agreeDisagree);

						msg.awaitReactions(agreeDisagree)
							.then(
								agreeOrDisagree.on('collect', reaction => {

									//disagree1 = Incorrect Ore
									switch (reaction.emoji.name) {
										// ore incorrect
										case '❌':
											oreInvoice = new Discord.MessageEmbed()
												.setTitle('Status: Rejected(Incorrect Ore)')
												.setAuthor(message.member.nickname, message.author.avatarURL())
												.setColor(15158332)
												.addFields({name: args, value: '----------', inline: true},
													{name: 'Total isk', value: formatMoney(quoteOutputTwo)}
												)
												.setTimestamp()
												.setFooter('Ore contract didn\'t match discord');
											msg.edit(oreInvoice);
											msg.reactions.removeAll();
											message.reply('Looks like you entered the incorrect type or amount of ore. Please check your contract and submit again.');
											break;

										//ore correct
										case '☑️':
											oreInvoice = new Discord.MessageEmbed()
												.setTitle('Status: Complete')
												.setDescription('Ore Accepted ☑️')
												.setAuthor(message.member.nickname, message.author.avatarURL())
												.setColor(3066993)
												.addFields({name: args, value: '----------', inline: true},
													{name: 'Total isk', value: formatMoney(quoteOutputTwo)}
												)
												.setTimestamp()
												.setFooter('Thanks for doing business with HTP');
											msg.edit(oreInvoice);
											msg.reactions.cache.get('❌').remove();
											msg.reactions.cache.get('☑️').remove();
									}
								})
							)
					})
				}
			})
		})
	}

	quoteTotalTwo = [];
	reportArray = [];
}