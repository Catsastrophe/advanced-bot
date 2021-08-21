const config = require('../../../config');
const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dab')
		.setDescription('Create a meme off a user\'s image or text.')
        .addUserOption(option => option.setName('user').setDescription('Avatar for image command').setRequired(true)),
	async execute(interaction, client) {
		let user = interaction.options.getUser('user');
        await interaction.deferReply();
        client.memer.dab(user.displayAvatarURL({format: 'png'})).then(image => {
            const img = new MessageAttachment(image, "dab.png");
            let emb = new MessageEmbed()
                .setImage("attachment://dab.png")
                .setFooter(`Meme for: ${interaction.member.user.tag}`)
                .setColor("RANDOM");
            wait(5000);
            interaction.editReply({embeds: [emb], files: [img]}).catch(e => console.log(e));
        });
	}
};

/*

> Coded by Lorne#0211
> https://discord.gg/bUMcVASrJM
> https://twitter.com/Lorne_Booker
> https://github.com/lornebookerr

*/