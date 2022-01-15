import { Permissions, MessageEmbed, Constants } from 'discord.js';
import { Mongoose } from 'mongoose';
import { ICommand } from 'wokcommands';
import banSchema from '../models/ban-schema';

export default {
    category: 'Moderation',
    description: 'Bans a user from the server.',

    permissions: ['BAN_MEMBERS'],
    guildOnly: true,

    minArgs: 3,
    expectedArgs: '<user> <reason> <global?>',

    slash: true,
    testOnly: false,

    options: [
        {
            name: 'user',
            description: 'The user you want to ban.',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.USER,
        },
        {
            name: 'reason',
            description: 'The reason for the ban.',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.STRING,
        },
        {
            name: 'global',
            description: 'Whether or not the ban is global.',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.BOOLEAN,
        },
    ],

    callback: async ({ guild, client, interaction: ctx }) => {
        await ctx.deferReply();

        function logs() {
            console.log('User is being banned...')
        }

        setTimeout(logs, 5000)

        const user = ctx.options.getUser('user')
        const reason = ctx.options.getString('reason')
        const global = ctx.options.getBoolean('global')

        const target = await guild!.members.cache.get(user!.id);

        const embed = new MessageEmbed()
            .setTitle(`${user!.tag} has been banned.`)
            .setDescription(`**Reason:** ${reason}`)
            .setColor(0xFF0000)
            .setFooter('CrossBan | Made by GateLogicLive#0001');

        await ctx.editReply({ embeds: [embed] });

        // target?.ban({ reason: reason! })

        if (global) {
            const banEmbed = new MessageEmbed()
            .setTitle('You have been banned.')
            .setDescription(`You have been banned globally. This means you have been banned in all servers that use CrossBan. \n\n**Reason**: ${reason}\nIf you want to appeal this please fill out the form below. The bot will DM you within 7 days with a result.\nAppeals Form: `)
            .setColor(0xFF0000)
            .setFooter('CrossBan | Made by GateLogicLive#0001');

            target?.send({embeds: [banEmbed]})

            try{
                const ban = new banSchema({
                    _id: user!.id,
                    guildId: ctx.guild!.id,
                    reason,
                });
        
                await ban.save();
            } catch{
                return 
            } 

            client.guilds.cache.forEach(a => a.members.ban(target!, {reason: reason!}))
        } else {
            const banEmbed = new MessageEmbed()
            .setTitle('You have been banned.')
            .setDescription(`You have been banned in ${ctx.guild!.name}. \n\n**Reason**: ${reason}`)
            .setColor(0xFF0000)
            .setFooter('CrossBan | Made by GateLogicLive#0001');

            target?.send({embeds: [banEmbed]})

            target?.ban({reason: reason!})
        }
    }
} as ICommand