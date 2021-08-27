const config = require("../../../config");
const db = require('quick.db');
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("playchess")
    .setDescription("Play a game of chess together."),
    async execute(interaction, client) {
        client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'poker').then(async invite => {
            return interaction.reply({embeds: [new MessageEmbed()
                .setDescription(`You can join the Chess party [**\`HERE\`**](${invite.code})`)
                .setFooter(`Please note: this application / system is still buggy`)
            ]});    
        });
    },
};
    