const config = require('../../../config');
const urbanDictionary = require('urban.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('urban')
		.addStringOption(option => option.setName('word').setDescription('The word you want to search for.').setRequired(true))
		.setDescription('Search for an urban dictionary definition.'),
	async execute(interaction, client) {
		const word = interaction.options.getString('word');
		        
		urbanDictionary(word).then((res) => {
			let emb = new MessageEmbed()
				.setTitle(`${res.word}`)
				.setThumbnail(res.picture)
				.addField('Definition', `${res.definition}`, true)
				.addField('Example', `${res.example}`, true)
				.setTimestamp()
				.setFooter(config.embeds.embedFooterText)
				.setColor('RANDOM');

			interaction.reply({embeds: [emb]});
		});
		
	}
};

