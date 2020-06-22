import * as Parser from "rss-parser";
import { Client, TextChannel, PartialGuildMember, Message, PartialMessage, MessageEmbed } from "discord.js";

const client = new Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
    if (msg.author.id !== client.user.id) {
        console.log(msg.content);

        if (msg.content === "feed") {
            client.channels.fetch("614494637251624981").then((channel: TextChannel) => {
                const rssParser = new Parser();

                rssParser.parseURL("http://www.reddit.com/r/news/.rss").then((feed) => {
                    const embed = new MessageEmbed();
                    embed.setAuthor(feed.title);

                    feed.items.forEach((item, index) => {
                        if (index > 20) return;
                        embed.addField(`${index + 1} - ${item.title}`, item.link, true);
                        console.log(index);
                    });
                });
            });
        }
    }
});

client.login("BOT_TOKEN");
