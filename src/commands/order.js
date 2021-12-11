
// Set requirements
const Discord = require('discord.js');
const mongo = require('../mongo');
const Report = require('../models/priceListSchema');

// Set Buy Prices


// Make sure needed arrays are empty
let quoteTotalThree = [];
let orderArray = [];
let orderNumber = [];

// Function to have isk value with commas 
function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}


// Ore Command
module.exports = async (message, args) => {
	// Check bot is in the right channel
		if (args.length < 2) {return message.reply('No Values Input :pensive: Try \'!order tritanium 1000 pyerite 1000...\'');}
		else {
			await mongo().then(async function () {
				function getBPrices(callback) {
					Report.find({}).exec((err, getPrice) => {
						if (err) callback(err, null);
						else callback(null, getPrice);
					})
				}

				let bPrices = [];
				await getBPrices(async function (err, priceResult) {
					if (err) {
						console.log(err);
					} else {
						console.log(priceResult);
						bPrices = priceResult;
						console.log(bPrices);

						// Loop through message for matching terms and add them to quoteTotal
						for (let i = 0; i < args.length; i++) {
							for (let j = 0; j < bPrices.length; j++) {
								if (args[i].toLowerCase() === bPrices[j].item){
									let buyPrice = parseFloat(bPrices[j].buy_price)
									console.log(bPrices[j].buy_price)
									quoteTotalThree.push(args[i + 1] * buyPrice);
								}
								console.log(quoteTotalThree);
							}
						}

						for (let l = 0; l < args.length; l += 2) {
							orderArray.push(args[l]);
						}
						console.log(orderArray);

						for (let m = 1; m < args.length; m += 2) {
							orderNumber.push(args[m]);
						}
						console.log(orderNumber);

						let quoteOutputThree = quoteTotalThree.reduce((a, b) => a + b, 0);
						quoteOutputThree = Math.round(quoteOutputThree);


						const disagree1 = '❌';
						const agree1 = '☑️';


						let orderInvoice = new Discord.MessageEmbed()
							.setTitle('Status: Buy Mats Request')
							.setAuthor(message.member.nickname, message.author.avatarURL())
							.setColor(15105570)
							.addFields({name: args, value: '----------', inline: true},
								{name: 'Total isk', value: formatMoney(quoteOutputThree)}
							)
							.setTimestamp()
							.setFooter('Donate isk to corp and await mats')
						;

						message.channel.send(orderInvoice).then(msg => {
							msg.react(agree1);
							msg.react(disagree1);
							message.reply(`Please donate ${formatMoney(quoteOutputThree)} isk to corp`);

							const agreeDisagree = (reaction, user) => reaction.message.guild.member(user).roles.cache.has('773244425291300896');
							const agreeOrDisagree = msg.createReactionCollector(agreeDisagree);

							msg.awaitReactions(agreeDisagree)
								.then(
									agreeOrDisagree.on('collect', reaction => {
										//disagree1 = Incorrect Ore
										switch (reaction.emoji.name) {
											// order incorrect
											case '❌':
												orderInvoice = new Discord.MessageEmbed()
													.setTitle('Status: Rejected(Incorrect Order)')
													.setAuthor(message.member.nickname, message.author.avatarURL())
													.setColor(15158332)
													.addFields({name: args, value: '----------', inline: true},
														{name: 'Total isk', value: formatMoney(quoteOutputThree)}
													)
													.setTimestamp()
													.setFooter('Order didn\'t match discord')
												;
												msg.edit(orderInvoice);
												msg.reactions.removeAll();
												message.reply('Looks like you entered the incorrect type or amount of minerals. Please check your contract and submit again.');
												break;

											//ore correct
											case '☑️':
												orderInvoice = new Discord.MessageEmbed()
													.setTitle('Status: Complete')
													.setDescription('Order Accepted ☑️')
													.setAuthor(message.member.nickname, message.author.avatarURL())
													.setColor(3066993)
													.addFields({name: args, value: '----------', inline: true},
														{name: 'Total isk', value: formatMoney(quoteOutputThree)}
													)
													.setTimestamp()
													.setFooter('Thanks for doing business with HTP');
												msg.edit(orderInvoice);
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

quoteTotalThree = [];
}

