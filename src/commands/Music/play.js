const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
        .addStringOption(option => option.setName('search').setDescription('What to search youtube for.'))
		.setDescription('Gets API latency in ms'),
	async execute(interaction, client) {
		const search = interaction.options.getString('search');

	}
};

/*

> Coded by Lorne#0211
> https://discord.gg/bUMcVASrJM
> https://twitter.com/Lorne_Booker
> https://github.com/lornebookerr

*/