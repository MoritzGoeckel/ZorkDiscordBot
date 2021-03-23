import { Zork } from "./ZorkWrapper";

const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
client.login(config.BOT_TOKEN);
let channel = null;

let zork: Zork | null = null;

client.on("message", function (message) {
    if (message.author.bot) return;
    const msg = message.content;

    if (msg == "!zork") {
        channel = message.channel;
        if(zork == null) {
            // start the game
            zork = new Zork((data) => {
                if (channel != null) {
                    channel.send(data.toString());
                }
            });
        } else {
            // quite the game
            zork = null;
        }
    }
    else if (zork != null) {
        // game is running
        console.log("command: " + msg);
        zork.execute(msg);
    }
});
