import { Permissions, MessageEmbed, Constants } from 'discord.js';
import { Mongoose } from 'mongoose';
import { ICommand } from 'wokcommands';
import banSchema from '../models/ban-schema';

export default {
    category: 'Moderation',
    description: 'Adds a user to the global ban list.',

    permissions: ['BAN_MEMBERS'],
    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',

    slash: true,
    testOnly: false,

    options: [
        {
            name: 'userid',
            description: 'The id of the user you want to ban.',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.STRING,
        },
        {
            name: 'reason',
            description: 'The reason for the ban.',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.STRING,
        }
    ],

    callback: async ({ guild, client, interaction: ctx }) => {
        await ctx.deferReply();

        function logs() {
            console.log('User is being banned...')
        }

        setTimeout(logs, 5000)

        const user = ctx.options.getString('userid')
        const reason = ctx.options.getString('reason')

        // const target = await guild!.members.cache.get(user);

        console.log(user)

        try{
            const ban = new banSchema({
                _id: user,
                guildId: ctx.guild!.id,
                reason,
            });
    
            await ban.save();
        } catch (e) {
            return console.log(e)
        } 

        const embed = new MessageEmbed()
            .setTitle(`${user} has been added to global ban list.`)
            .setDescription(`**Reason:** ${reason}`)
            .setColor(0xFF0000)
            .setFooter('CrossBan | Made by GateLogicLive#0001');

        await ctx.editReply({ embeds: [embed] });
    }
} as ICommand