import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";

export default {
    category: "Utility",
    description: "Gets the API, Websocket and Database latency.",
    slash: true,
    testOnly: false,

    callback: async ({ client, interaction: ctx,  }) => {
        await ctx.deferReply();

        const embed = new MessageEmbed()
            .setTitle("CrossBan API Stats")
            .addField("API Latency", `${client.ws.ping}ms`, true)
            .setColor(0x00FF00)
            .setFooter("CrossBan | Made by GateLogicLive#0001");

        await ctx.editReply({ embeds: [embed] });
    }
} as ICommand;