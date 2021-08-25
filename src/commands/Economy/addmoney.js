const config = require("../../../config");
const db = require("quick.db");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addmoney")
    .setDescription("Add money to a user")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of money you want to add.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to add money to.")
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
        let balance = client.db.get(`${user.id}_balance`);
        client.db.set(`${interaction.member.id}_balance`, balance + amount);
        let emb = new MessageEmbed()
          .setDescription(
            `Added **\`${amount}\`**.\n${user.tag} now has **\`${client.db.get(
              `${user.id}_balance`
            )}\`** in their bank.`
          )
          .setColor("GREEN");

        return interaction.reply({ embeds: [emb] });
      } else {
        let balance = client.db.get(`${interaction.member.id}_balance`);
        client.db.set(`${interaction.member.id}_balance`, balance + amount);
        let emb = new MessageEmbed()
          .setDescription(
            `You added **\`${amount}\`** to your balance.\nYou now have **\`${client.db.get(
              `${interaction.member.id}_balance`
            )}\`** in your bank.`
          )
          .setColor("GREEN");

        return interaction.reply({ embeds: [emb] });
      }
    }
  },
};
