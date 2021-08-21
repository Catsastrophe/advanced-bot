const config = require('../../../config');
const animeScraper = require('mal-scraper');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('animesearch')
		.addStringOption(option => option.setName('anime').setDescription('The anime you want to search for.').setRequired(true))
		.setDescription('Search for an anime\'s stats.'),
	async execute(interaction, client) {
		const anime = interaction.options.getString('anime');
		        
		animeScraper.getInfoFromName(anime).then((res) => {
			let emb = new MessageEmbed()
				.setTitle(`${res.englishTitle} (${res.japaneseTitle})`)
				.setThumbnail(res.picture)
				.addField('Type', `${res.type}`, true)
				.addField('Episodes', `${res.episodes}`, true)
				.addField('Rating', `${res.rating}`, true)
				.addField('Aired', `${res.aired}`, true)
				.addField('Score', `${res.score}`, true)
				.addField('Link', `[\`CLICK HERE\`](${res.url})`, true)
				.setTimestamp()
				.setFooter(config.embeds.embedFooterText)
				.setColor('AQUA');

			interaction.reply({embeds: [emb]});
		});
		
	}
};

/*

> Coded by Lorne#0211
> https://discord.gg/bUMcVASrJM
> https://twitter.com/Lorne_Booker
> https://github.com/lornebookerr

*/