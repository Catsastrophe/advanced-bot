const wait = require("util").promisify(setTimeout);
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .addStringOption((option) => option.setName("search").setDescription("What to search YouTube for.").setRequired(true))
    .setDescription("Gets API latency in ms"),
  async execute(interaction, client) {
    const search = interaction.options.getString("search");    
    try {
      client.distube.play(message, string);
    } catch (e) {
      message.channel.send(`${client.emotes.error} | Error: \`${e}\``);
    }
  },
};


