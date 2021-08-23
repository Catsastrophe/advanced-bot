const fs = require('fs');
const config = require('../config');
const Meme = require('memer-api');
const colour = require('colour');
const { Player } = require('discord-player');
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');

const client = new Client({
	intents:[ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES ],
	shards: 'auto',
	disableEveryone: true
});

client.commands = new Collection();
client.memer = new Meme(config.apis.memer);
client.distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true })

require('dotenv').config();

const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));
const eventsFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/commands');

(async () => {
	for (file of functions){
		require(`./functions/${file}`)(client);
	}

	client.handleEvents(eventsFiles, './src/events');
	client.handleCommands(commandFolders, './src/commands');
	client.login(process.env.SECRET);
})();


const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        ` | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        ` | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        ` | Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        ` | Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send(` | Searching canceled`))
    .on("error", (message, err) => message.channel.send(` | An error encountered: ${err}`))

