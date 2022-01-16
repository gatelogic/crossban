import { Client, TextChannel, MessageEmbed } from 'discord.js'
import WOKCommands from 'wokcommands'
import banSchema from '../models/ban-schema';

export default async (client: Client, instance: WOKCommands) => {
    client.on('guildCreate', async (guild) => {
        let defaultChannel: any = "";
        guild.channels.cache.forEach((channel) => {
            if(channel.type === "GUILD_TEXT" && defaultChannel == "") {
                if(guild.me?.permissions.has("SEND_MESSAGES")) {
                    defaultChannel = channel;
                }
            }
        })

        const welcomeEmbed = new MessageEmbed()
            .setTitle('Welcome to CrossBan!')
            .setDescription('Thanks for adding CrossBan to your server, now I need to explain a few things.')
            .addField('1. Make sure ALL staff members join the support server.', 'Due to the nature the bot exists in, there is a small list of "*permitted users*" that can ban people across Discord servers. Make sure staff members join so they can request a global ban where our team will identify the problem and take it from there.\nhttps://discord.gg/FJBcNT6zbF')
            .addField('2. Run /refresh.', 'This is a command that will make the bot run through the global ban list and ban anyone that matches. This is a good way to make sure the bot is up to date.')
            .addField('3. Disclaimer.', 'If you do not wish to allow CrossBan to ban possibly malicious people in your Discord, please remove me from your server. I thank you for adding me and I hope you want these features but I understand people can get nervous when banning people is involved. ')
            .setFooter('CrossBan | Making Discord Safer')

        defaultChannel.send({embed: welcomeEmbed})
    });
}