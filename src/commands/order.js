/* eslint-disable linebreak-style */
const Discord = require('discord.js');
const orderChannelID = '757717773010075649';

const orderPrices = [
	['tritanium',2],
	['pyerite',23],
	['mexallon',20],
	['isogen',56],
	['nocxium',935],
	['zydrine',1020],
	['megacyte',1710],
	['morphite',0],
	// Pi Below
	['lusteringalloy',75],
	['sheencompound',139],
	['gleamingalloy',201],
	['condensedalloy',53],
	['preciousalloy',242],
	['motleycompound',95],
	['fibercomposite',72],
	['lucentcompound',116],
	['opulentcompound',80],
	['glossycompound',111],
	['crystalcompound',139],
	['darkcompound',96],
	['basemetals',113],
	['heavymetals',167],
	['noblemetals',77],
	['reactivemetals',331],
	['toxicmetals',225],
];

let quoteTotalThree = [];
let orderArray = [];
let orderNumber = [];

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}


module.exports = (message, args) =>  {
		
	if (message.channel.id === orderChannelID) {
		if (args.length < 2) {return message.reply('No Values Input :pensive: Try \'!order tritanium 1000 pyerite 1000...\'');}
		else {

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
				.setTitle('Status: Sell Ore Request')
				.setAuthor(message.member.nickname, message.author.avatarURL())
				.setColor(15105570) 
				.addFields({ name: args, value: '----------', inline: true},
					{ name: 'Total isk', value: formatMoney(quoteOutputThree)}
				)
				.setTimestamp()
				.setFooter('Send contract with ore to Ecomartin requesting isk amount below')
	;
	
			message.channel.send(orderInvoice).then( msg => {
				msg.react(agree1);
				msg.react(disagree1);
				message.reply(`Please send contract with ore to Econmartin requesting ${formatMoney(quoteOutputThree)} isk`);
				
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
									.setTitle('Status: Rejected(Incorrect Ore)')
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