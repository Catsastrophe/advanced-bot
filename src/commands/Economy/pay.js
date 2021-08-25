const config = require("../../../config");
const db = require("quick.db");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("Give a user some of your money.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to give money to.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount you want to give.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");
    let balance = client.db.get(`${interaction.member.id}_balance`);
    let usrBalance = client.db.get(`${user.id}_balance`);

    if (balance < amount) return await interaction.reply({content: `**❌ | You do not have \`${amount}\`**.\nYour current balance is **\`${client.db.get(`${interaction.member.id}_balance`)}\`**`, ephemeral: true});
    client.db.set(`${user.id}_balance`, usrBalance + amount);
    client.db.set(`${interaction.member.id}_balance`, balance - amount);

    return await interaction.reply({embeds: [new MessageEmbed()
        .setDescription(`Successfully transferred **${amount}** to **${user.tag}**.\nYour balance is now **\`${client.db.get(`${interaction.member.id}_balance`)}\`**`)
        .setColor('GREEN')
    ]});
  },
};
