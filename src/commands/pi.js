const Discord = require('discord.js');
const piChannelID = '758978691509780481';


const piPrices = [
['lusteringalloy',85],
['sheencompound',243],
['gleamingalloy',202],
['condensedalloy',83],
['preciousalloy',246],
['motleycompound',240],
['fibercomposite',101],
['lucentcompound',50],
['opulentcompound',119],
['glossycompound',106],
['crystalcompound',85],
['darkcompound',73],
['basemetals',164],
['heavymetals',196],
['noblemetals',56],
['reactivemetals',505],
['toxicmetals',570],
['reactivegas',279],
['noblegas',410],
['industrialfibers',900],
['supertensileplastics',825],
['polyaramids',536],
['coolant',975],
['condensates',362],
['constructionblocks',319],
['nanites',1350],
['silicateglass',1200],
['smartfabunits',640],
['heavywater',3],
['suspendedplasma',20],
['liquidozone',60],
['ionicsolutions',568],
['oxygenisotopes', 1950],
['plasmoids',2625],
];


let piTotal = [];
let piArray = [];
let piNumber = [];

function formatMoney(number) {
    return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
};


module.exports = (message, args) =>  {
		
    if (message.channel.id === piChannelID) {
		if (args.length < 2) {return message.reply("No Values Input :pensive: Try '!pi lusteringalloy 10000 gleamingalloy 10000...'")}
	else {

		for (let i = 0; i < args.length; i++) {
			for (let j = 0; j < piPrices.length; j++) {
				if (args[i].toLowerCase() === piPrices[j][0]) {
					piTotal.push(args[i+1] * piPrices[j][1]);
				}
				console.log(piTotal);
			}  
		};
		
		for (let l = 0; l < args.length; l+=2) {
			piArray.push(args[l])
		}
		console.log(piArray);
	
		for (let m = 1; m < args.length; m+=2) {
			piNumber.push(args[m])
		}
		console.log(piNumber);
	
		const piOutput = piTotal.reduce((a,b) => a+b,0);
		
		const disagree1 = "❌";
		const agree1 = "☑️";


	let oreInvoice = new Discord.MessageEmbed()
	.setTitle('Status: Sell PI Request')
	.setAuthor(message.member.nickname, message.author.avatarURL())
	.setColor(15105570) 
	.addFields({ name: args, value: '----------', inline: true},
		{ name: 'Total isk', value: formatMoney(piOutput)}
	)
	.setTimestamp()
	.setFooter('Send contract with PI to Ecomartin requesting isk amount below')
	;
	
	message.channel.send(oreInvoice).then( msg => {
		msg.react(agree1)
		msg.react(disagree1)
		message.reply(`Please send contract with PI to Econmartin requesting ${formatMoney(piOutput)} isk`)
				
		const agreeDisagree = (reaction, user) =>  reaction.message.guild.member(user).roles.cache.has('773244425291300896');
		const agreeOrDisagree = msg.createReactionCollector(agreeDisagree);

		msg.awaitReactions(agreeDisagree)
			.then(
		
		agreeOrDisagree.on('collect', reaction => {
			
			//disagree1 = Incorrect Ore
			switch (reaction.emoji.name)  {
				// ore incorrect
				case '❌': 
					oreInvoice = new Discord.MessageEmbed()
					.setTitle('Status: Rejected(Incorrect PI)')
					.setAuthor(message.member.nickname, message.author.avatarURL())
					.setColor(15158332)
					.addFields({ name: args, value: '----------', inline: true},
						{ name: 'Total isk', value: formatMoney(piOutput)}
					)
					.setTimestamp()
					.setFooter("PI contract didn't match discord")
				msg.edit(oreInvoice)
				msg.reactions.removeAll()
				message.reply('Looks like you entered the incorrect type or amount of PI. Please check your contract and submit again.')
				break;

				//ore correct
				case '☑️':
					oreInvoice = new Discord.MessageEmbed()
					.setTitle('Status: Complete')
					.setDescription('PI Accepted ☑️')
					.setAuthor(message.member.nickname, message.author.avatarURL())
					.setColor(3066993)
					.addFields({ name: args, value: '----------', inline: true},
						{ name: 'Total isk', value: formatMoney(piOutput)}
					)
					.setTimestamp()
					.setFooter('Thanks for doing business with HTP')
				msg.edit(oreInvoice)
				msg.reactions.cache.get("❌").remove()
				msg.reactions.cache.get("☑️").remove()
			}
		})
	
	)})
		
	
}
piTotal = [];
}
};
