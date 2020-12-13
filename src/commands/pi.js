const Discord = require('discord.js');
const piChannelID = '758978691509780481';


const piPrices = [
['lusteringalloy',119],
['sheencompound',169],
['gleamingalloy',208],
['condensedalloy',130],
['preciousalloy',299],
['motleycompound',131],
['fibercomposite',68],
['lucentcompound',133],
['opulentcompound',167],
['glossycompound',166],
['crystalcompound',118],
['darkcompound',53],
['basemetals',92],
['heavymetals',150],
['noblemetals',135],
['reactivemetals',587],
['toxicmetals',602],
['reactivegas',52],
['noblegas',65],
['industrialfibers',521],
['supertensileplastics',825],
['polyaramids',452],
['coolant',452],
['condensates',563],
['constructionblocks',665],
['nanites',1275],
['silicateglass',825],
['smartfabunits',621],
['heavywater',3],
['suspendedplasma',23],
['liquidozone',62],
['ionicsolutions',281],
['oxygenisotopes', 1200],
['plasmoids',4050],
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
