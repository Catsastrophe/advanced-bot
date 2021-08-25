const config = require("../../../config");
const db = require("quick.db");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fish")
    .setDescription("Catch some fish and make a profit."),
  async execute(interaction, client) {
    if (client.fishCooldown.has(interaction.member.id)) {
      await interaction.reply({
        content:
          "**❌ | You are on cooldown for this command, come back later!**",
        ephemeral: true,
      });
    } else {
      const successCrimes = [
        "caught a Cod",
        "caught a Bass",
        "caught a Plaice",
        "caught some Mackerel",
        "caught some Tuna",
        "caught a Salmon"
      ];
      const failCrimes = [
        "tried to catch a Cod",
        "tried to catch a Bass",
        "tried to catch a Plaice",
        "tried to catch some Mackerel",
        "tried to catch some Tuna",
        "tried to catch a Salmon"
      ];
      const payouts = [
        1550, 2495, 550, 14250, 5200, 1300
      ];

      let fish = client.db.get(`${interaction.member.id}_fish`);
      let balance = client.db.get(`${interaction.member.id}_balance`);
      let fishcount;
      let chance;

      if (fish === null) fishcount = 0;
      else fishcount = fish;

      if (balance < 499) {
        return await interaction.reply({
          content:
            "**❌ | You do not have enough money to go fishing, you need at least **`500`**!**",
          ephemeral: true,
        });
      }

      if (fishcount < 2) chance = 20;
      else if (fishcount < 5) chance = 30;
      else if (fishcount < 7) chance = 35;
      else if (fishcount < 10) chance = 45;
      else chance = 50;

      let rand = Math.floor(Math.random() * 100) + 1;
      if (rand <= chance) {
        // win
        let fishno = Math.floor(Math.random() * successCrimes.length) + 0;
        client.db.set(`${interaction.member.id}_fish`, fishcount + 1);
        client.db.set(`${interaction.member.id}_balance`, balance + payouts[fishno]);
        await interaction.reply({
          embeds: [ new MessageEmbed()
            .setDescription(`You **\`${successCrimes[fishno]}\`**!\nYou sold the fish for **\`${payouts[fishno]}\`**.\nYour balance is **\`${client.db.get(`${interaction.member.id}_balance`)}\`**.`)
            .setColor('GREEN')
          ],
        });
      } else {
        // loose
        let fishno = Math.floor(Math.random() * successCrimes.length) + 0;
        client.db.set(`${interaction.member.id}_fish`, fishcount + 1);
        client.db.set(`${interaction.member.id}_balance`, balance - 500);
        await interaction.reply({
          embeds: [ new MessageEmbed()
            .setDescription(`You **${failCrimes[fishno]}** and failed!\nYou lost **\`500\`** in bait.\nYour balance is **\`${client.db.get(`${interaction.member.id}_balance`)}\`**.\nYou have been fishing **${client.db.get(`${interaction.member.id}_fish`)}** times(s).`)
            .setColor("RED")
          ],
        });
      }

      client.fishCooldown.add(interaction.member.id);
      setTimeout(() => {
        client.fishCooldown.delete(interaction.member.id);
      }, 60000); // 2 mins
    }
  },
};
