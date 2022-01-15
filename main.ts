import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import WOKCommands from 'wokcommands';
import path from 'path';
import mongoose from 'mongoose';
import banSchema from './models/ban-schema';

dotenv.config();

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS],
});

client.on('ready', async () => {
    await mongoose.connect(process.env.MONGO_URI || '', {
        keepAlive: true
    });

    console.log(`Logged in as ${client.user!.tag}!`);

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'events'),
        typeScript: true,
        testServers: ['930861209723502672'],
        botOwners: ['701561771529470074'],
        disabledDefaultCommands: [
            'command',
            'slash'
        ],
    })
});

client.login(process.env.TOKEN);