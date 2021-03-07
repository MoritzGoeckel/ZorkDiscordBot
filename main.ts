import { Zork } from "./ZorkWrapper";

const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
client.login(config.BOT_TOKEN);
let channel = null;

let zorkmode: boolean = false;

let zork = null;

client.on("message", function (message) {
  if (message.author.bot) return;
  //console.log(message);
  // if (!message.content.startsWith(prefix)) return;

  //const commandBody = message.content.slice(prefix.length);
  //const args = commandBody.split(' ');
  //const command = args.shift().toLowerCase();
  const command = message.content;
  if (zorkmode) {
    console.log("Command detected:" + command);
    zork.execute(command);
  }

  if (command == "!ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    if (channel != null) {
      channel.send(`Pong! To channel, latency of ${timeTaken}ms.`);
    } else {
      message.reply(`Pong! Reply, latency of ${timeTaken}ms.`);
    }
  }
  if (command == "!wave") {
    message.reply(":wave:");
  }
  if (command == "!zork") {
    zorkmode = true;
    channel = message.channel;
    zork = new Zork((data) => {
        console.log("Zork 1 callback: " + data);
        if (channel != null) {
          console.log("Zork 2 callback: " + data);
          channel.send(data.toString());
        }
      });
  }
});
