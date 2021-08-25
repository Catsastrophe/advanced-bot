const config = require("../../../config");
const db = require("quick.db");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setmoney")
    .setDescription("Set money of a user")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of money you want to set.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to set money to.")
    ),
  async execute(interaction, client) {
    const amount = interaction.options.getInteger("amount");
    const user = interaction.options.getUser("user");

    if (!config.settings.owners.includes(interaction.member.id)) {
      await interaction.reply({
        content:
          "**❌ | You do not have the permissions to run this command!**",
        ephemeral: true,
      });
    } else {
      if (user) {
        client.db.set(`${user.id}_balance`, amount);
        let emb = new MessageEmbed()
          .setDescription(
            `Set **${user.tag}**'s balance to **\`${amount}\`**.\n${user.tag} now has **\`${client.db.get(
              `${user.id}_balance`
            )}\`** in their bank.`
          )
          .setColor("GREEN");

        return interaction.reply({ embeds: [emb] });
      } else {
        client.db.set(`${interaction.member.id}_balance`, amount);
        let emb = new MessageEmbed()
          .setDescription(
            `You set your balance to **\`${amount}\`**.\nYou now have **\`${client.db.get(
              `${interaction.member.id}_balance`
            )}\`** in your bank.`
          )
          .setColor("GREEN");

        return interaction.reply({ embeds: [emb] });
      }
    }
  },
};
