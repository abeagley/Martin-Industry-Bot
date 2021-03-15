/* eslint-disable linebreak-style */

// Set requirements
const Discord = require('discord.js');
const orderChannelID = '757717773010075649';

// Set Prices
const orderPrices = [
	['tritanium',3],
	['pyerite',21],
	['mexallon',30],
	['isogen',84],
	['nocxium',811],
	['zydrine',1020],
	['megacyte',2125],
	['morphite',0],
	// Pi Below
	['lusteringalloy',327],
	['sheencompound',201],
	['gleamingalloy',322],
	['condensedalloy',128],
	['preciousalloy',426],
	['motleycompound',278],
	['fibercomposite',105],
	['lucentcompound',326],
	['opulentcompound',530],
	['glossycompound',139],
	['crystalcompound',283],
	['darkcompound',209],
	['basemetals',741],
	['heavymetals',291],
	['noblemetals',287],
	['reactivemetals',589],
	['toxicmetals',361],
	['plasmoids',2475],
];

// Make sure needed arrays are empty
let quoteTotalThree = [];
let orderArray = [];
let orderNumber = [];

// Function to have isk value with commas 
function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}


// Ore Command
module.exports = (message, args) =>  {
		
	// Check bot is in the right channel
	if (message.channel.id === orderChannelID) {

		// Check that they have entered values
		if (args.length < 2) {return message.reply('No Values Input :pensive: Try \'!order tritanium 1000 pyerite 1000...\'');}
		else {

			// Loop through message for matching terms and add them to quoteTotal
			for (let i = 0; i < args.length; i++) {
				for (let j = 0; j < orderPrices.length; j++) {
					if (args[i].toLowerCase() === orderPrices[j][0]) {
						quoteTotalThree.push(args[i+1] * orderPrices[j][1]);
					}
					console.log(quoteTotalThree);
				}  
			}
		
			
			for (let l = 0; l < args.length; l+=2) {
				orderArray.push(args[l]);
			}
			console.log(orderArray);
	
			for (let m = 1; m < args.length; m+=2) {
				orderNumber.push(args[m]);
			}
			console.log(orderNumber);
	
			const quoteOutputThree = quoteTotalThree.reduce((a,b) => a+b,0);
		
			const disagree1 = '❌';
			const agree1 = '☑️';


			let orderInvoice = new Discord.MessageEmbed()
				.setTitle('Status: Buy Mats Request')
				.setAuthor(message.member.nickname, message.author.avatarURL())
				.setColor(15105570) 
				.addFields({ name: args, value: '----------', inline: true},
					{ name: 'Total isk', value: formatMoney(quoteOutputThree)}
				)
				.setTimestamp()
				.setFooter('Donate isk to corp and await mats')
	;
	
			message.channel.send(orderInvoice).then( msg => {
				msg.react(agree1);
				msg.react(disagree1);
				message.reply(`Please donate ${formatMoney(quoteOutputThree)} isk to corp`);
				
				const agreeDisagree = (reaction, user) =>  reaction.message.guild.member(user).roles.cache.has('773244425291300896');
				const agreeOrDisagree = msg.createReactionCollector(agreeDisagree);

				msg.awaitReactions(agreeDisagree)
					.then(
		
						agreeOrDisagree.on('collect', reaction => {
			
							//disagree1 = Incorrect Ore
							switch (reaction.emoji.name)  {
							// order incorrect
							case '❌': 
								orderInvoice = new Discord.MessageEmbed()
									.setTitle('Status: Rejected(Incorrect Order)')
									.setAuthor(message.member.nickname, message.author.avatarURL())
									.setColor(15158332)
									.addFields({ name: args, value: '----------', inline: true},
										{ name: 'Total isk', value: formatMoney(quoteOutputThree)}
									)
									.setTimestamp()
									.setFooter('Order didn\'t match discord');
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
									.addFields({ name: args, value: '----------', inline: true},
										{ name: 'Total isk', value: formatMoney(quoteOutputThree)}
									)
									.setTimestamp()
									.setFooter('Thanks for doing business with HTP');
								msg.edit(orderInvoice);
								msg.reactions.cache.get('❌').remove();
								msg.reactions.cache.get('☑️').remove();
							}
						})
	
					);});
		
	
		}
		quoteTotalThree = [];
	}
};