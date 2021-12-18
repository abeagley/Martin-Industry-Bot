const Discord = require('discord.js');

const mongo = require('../mongo');
const Report = require('../models/priceListSchema');

//Set sell prices

let argArray =[];
let piTotal = [];
let piArray = [];
let piNumber = [];
let reportArray = [];

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}


module.exports = async (message, args) => {
	// Check bot is in the right channel
		// Check that they have entered values
		if (args.length < 2) {return message.reply('No Values Input :pensive: Try \'!pis lusteringalloy 1000 plasmoids 1000...\'');}
		else if (args.length > 21) {return message.reply('Too many values :pensive: Keep it to 10 or less ')}
		else {
			await mongo().then(async function () {
				function getSPrices(callback) {
					Report.find({}).exec((err, getPrice) => {
						if (err) callback(err, null);
						else callback(null, getPrice);
					})
				}

				let sPrices = [];
				await getSPrices(async function (err, priceResult) {
					if (err) {
						console.log(err);
					} else {
						console.log(priceResult);
						sPrices = priceResult;
						console.log(sPrices);
						argArray = args;

						for (let i = 0; i < args.length; i++) {
							for (let j = 0; j < sPrices.length; j++) {
								if (args[i].toLowerCase() === sPrices[j].item) {
									reportArray.push(args[i])
									console.log(reportArray)
									let sellPi = parseFloat(sPrices[j].sell_price)
									console.log(sPrices[j].sell_price)
									reportArray.push(sellPi)
									console.log(reportArray)
									reportArray.push(args[i+1])
									console.log(reportArray)
									piTotal.push(args[i + 1] * sellPi)
									reportArray.push(args[i + 1] * sellPi)
									console.log(reportArray);

								}
								console.log(piTotal);
							}
						}

						for (let l = 0; l < args.length; l += 2) {
							piArray.push(args[l]);
						}
						console.log("piArray = " + piArray);

						for (let m = 1; m < args.length; m += 2) {
							piNumber.push(args[m]);
						}
						console.log("piNumber = " + piNumber);

						let piOutput = piTotal.reduce((a, b) => a + b, 0);
						piOutput = Math.round(piOutput);

						const disagree1 = '❌';
						const agree1 = '☑️';


						let oreInvoice = new Discord.MessageEmbed()
							.setTitle('Status: Sell PI Request')
							.setAuthor(message.member.nickname, message.author.avatarURL())
							.setColor(15105570)
							.addFields(
								{name: reportArray[2] + " " + reportArray[0] + " @ " + reportArray[1] , value: reportArray[3], inline: true},
								{name: reportArray[6] + " " + reportArray[4] + " @ " + reportArray[5] , value: reportArray[7], inline: true},
								{name: reportArray[10] + " " + reportArray[8] + " @ " + reportArray[9] , value: reportArray[11], inline: true},
								{name: reportArray[14] + " " + reportArray[12] + " @ " + reportArray[13] , value: reportArray[15], inline: true},
								{name: reportArray[18] + " " + reportArray[16] + " @ " + reportArray[17] , value: reportArray[19], inline: true},
								{name: reportArray[22] + " " + reportArray[20] + " @ " + reportArray[21] , value: reportArray[23], inline: true},
								{name: reportArray[26] + " " + reportArray[24] + " @ " + reportArray[25] , value: reportArray[27], inline: true},
								{name: reportArray[30] + " " + reportArray[28] + " @ " + reportArray[29] , value: reportArray[31], inline: true},
								{name: reportArray[34] + " " + reportArray[32] + " @ " + reportArray[33] , value: reportArray[35], inline: true},
								{name: reportArray[38] + " " + reportArray[36] + " @ " + reportArray[37] , value: reportArray[39], inline: true},
								{name: 'Total isk', value: formatMoney(piOutput)}
							)
							.setTimestamp()
							.setFooter('Please ping a director asking where contract should go to request')
						;

						message.channel.send(oreInvoice).then(msg => {
							msg.react(agree1);
							msg.react(disagree1);
							message.reply(`Please ping a director asking where contract should go to request ${formatMoney(piOutput)} isk`);

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
													.setTitle('Status: Rejected(Incorrect PI)')
													.setAuthor(message.member.nickname, message.author.avatarURL())
													.setColor(15158332)
													.addFields({name: args, value: '----------', inline: true},
														{name: 'Total isk', value: formatMoney(piOutput)}
													)
													.setTimestamp()
													.setFooter('PI contract didn\'t match discord');
												msg.edit(oreInvoice);
												msg.reactions.removeAll();
												message.reply('Looks like you entered the incorrect type or amount of PI. Please check your contract and submit again.');
												break;

											//ore correct
											case '☑️':
												oreInvoice = new Discord.MessageEmbed()
													.setTitle('Status: Complete')
													.setDescription('PI Accepted ☑️')
													.setAuthor(message.member.nickname, message.author.avatarURL())
													.setColor(3066993)
													.addFields(
														{name: args, value: '----------', inline: true},
														{name: 'Total isk', value: formatMoney(piOutput)}
													)
													.setTimestamp()
													.setFooter('Thanks for doing business with HTP');
												msg.edit(oreInvoice);
												msg.reactions.cache.get('❌').remove();
												msg.reactions.cache.get('☑️').remove();
										}
									})
								);
						});
					}
				})
			})

	
		}

	piTotal = [];
};
