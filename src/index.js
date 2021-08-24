const fs = require('fs');
const config = require('../config');
const Meme = require('memer-api');
const colour = require('colour');
const { Player } = require('discord-player');
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');

const client = new Client({
	intents:[ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES ],
	shards: 'auto',
	disableEveryone: true,
    presence: {
        status: 'online',
        activity: {
            name: 'with commands',
            type: 'PLAYING'
        }
    }
});

client.commands = new Collection();
client.memer = new Meme(config.apis.memer);

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