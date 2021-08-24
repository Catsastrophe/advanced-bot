const config = require("../../../config");
const db = require('quick.db');
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("bet")
    .addIntegerOption(option => option.setName('amount').setDescription('The amount you want to bet.').setRequired(true))
    .setDescription("Check your balance."),
    async execute(interaction, client) {
		const amount = interaction.options.getInteger('amount');
        let balance = client.db.get(`${interaction.member.id}_balance`);

        let emb = new MessageEmbed()
            .setDescription(`The amount you are betting is higher than your total balance.\nYour balance is **\`${balance}\`**.`)
            .setColor('RED')
        if (amount > balance) return interaction.reply({embeds: [emb]})

        let chance = Math.floor(Math.random() * 3) + 1;

        if (chance !== 3) {
            client.db.set(`${interaction.member.id}_balance`, balance - amount);
            let loose_emb = new MessageEmbed()
                .setDescription(`**You lost!**\nAmount: **\`${amount}\`**\nYour total balance is now: **\`${client.db.get(`${interaction.member.id}_balance`)}\`**`)
                .setColor('RED')
            return interaction.reply({embeds: [loose_emb]})
        } else {
            client.db.set(`${interaction.member.id}_balance`, balance + Math.floor((amount * 1.75)));
            let win_emb = new MessageEmbed()
                .setDescription(`**You won!**\nAmount: **\`${amount * 1.75}\`**\nYour total balance is now: **\`${client.db.get(`${interaction.member.id}_balance`)}\`**`)
                .setColor('GREEN')
            return interaction.reply({embeds: [win_emb]})
        }
    },
};