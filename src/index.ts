import "dotenv/config";
import './database';
import axios from "axios";
import { Client, MessageEmbed, TextChannel } from "discord.js";
import Teasers from "./teasers";
import { Music } from "./music/Music";
import { News } from "./news/news";
import { DonaldTracker } from "./DonaldTracker/DonaldTracker";
import { Counting } from "./Counting/Counting";
const client = new Client({ restTimeOffset: 30 });
client.login(process.env.BOT_TOKEN);
const prefix = "c!";

let music: Music;

client.on("ready", () => {
  const instance = process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'development'
  console.log(client.guilds.cache);
  (<TextChannel>client.channels.cache.get('767763290004652037')).send(`${client.user.tag} has logged in at ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}. Instance is on **${instance}**.`);
  console.log(`${client.user.tag} has logged in at ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}. Instance is on **${instance}**.`);
  client.user.setActivity("c!creeper-bot-help");
  new Counting(client);
  new News(client);
  new DonaldTracker(client);
  // music = new Music(client);
  // new Teasers(client);


  const oldObj = [
    {
      id: 'The Fortnite Crew Announcement',
      title: 'The Fortnite Crew',
      tabTitle: 'New Subscription',
      body: 'Coming in Season 5, join the Fortnite Crew to unlock the Battle Pass for the full Season, get a monthly exclusive Crew Pack and 1,000 V-bucks every month! Learn more at fn.gg/FortniteCrew',
      image: 'https://cdn2.unrealengine.com/en-14br-social-subscriptions-motd-1920x1080-1920x1080-617263273.jpg',
      tileImage: 'https://cdn2.unrealengine.com/en-14br-social-subscriptions-motd-1024x512-1024x512-617263267.jpg',
      sortingPriority: 50,
      hidden: false
    },
    {
      id: 'Devourer of Worlds - Battle Bus Render Image',
      title: 'The Devourer of Worlds',
      tabTitle: 'Galactus Approaches',
      body: 'You do know how to drive the Battle Bus... right? Galactus arrives Tuesday, December 1 at 4 PM ET. Learn more at fn.gg/DevourerOfWorlds',
      image: 'https://cdn2.unrealengine.com/14br-battlebus-render-motd-1920x1080-lasersgopewpew-1920x1080-658872810.jpg',
      tileImage: 'https://cdn2.unrealengine.com/14br-battlebus-render-motd-1024x512-lasersgopewpew-1024x512-658872797.jpg',
      sortingPriority: 40,
      hidden: false
    }
  ]

  const newObj = [
    {
      id: 'The Fortnite Crew Announcement',
      title: 'The Fortnite Crew',
      tabTitle: 'New Subscription',
      body: 'Coming in Season 5, join the Fortnite Crew to unlock the Battle Pass for the full Season, get a monthly exclusive Crew Pack and 1,000 V-bucks every month! Learn more at fn.gg/FortniteCrew',
      image: 'https://cdn2.unrealengine.com/en-14br-social-subscriptions-motd-1920x1080-1920x1080-617263273.jpg',
      tileImage: 'https://cdn2.unrealengine.com/en-14br-social-subscriptions-motd-1024x512-1024x512-617263267.jpg',
      sortingPriority: 50,
      hidden: false
    },
    {
      id: 'Devourer of Worlds - Battle Bus Render Image',
      title: 'The Devourer of Worlds',
      tabTitle: 'Galactus Approaches',
      body: 'You do know how to drive the Battle Bus... right? Galactus arrives Tuesday, December 1 at 4 PM ET. Learn more at fn.gg/DevourerOfWorlds',
      image: 'https://cdn2.unrealengine.com/14br-battlebus-render-motd-1920x1080-lasersgopewpew-1920x1080-658872810.jpg',
      tileImage: 'https://cdn2.unrealengine.com/14br-battlebus-render-motd-1024x512-lasersgopewpew-1024x512-658872797.jpg',
      sortingPriority: 40,
      hidden: false
    }
  ]
  // const oldObj = [
  //     { name: "bob" },
  //     { name: "joe" }
  // ];

  // const newObj = [
  //     { name: "sam" },
  //     { name: "bob" }
  // ];
  // const diff = [];
  // for (const newItem of newObj) {
  //     for (const oldItem of oldObj) {
  //         if (!oldObj.includes(newItem)) diff.push(newItem);
  //     }
  // }
  // console.log(diff)

});

client.on("message", async (message) => {
  if (message.content.toLowerCase().startsWith("c!level")) {
    const username = message.content.split("c!level ")[1];
    console.log(username, message.content.split("c!level "))
    const r = await axios.get(`https://fortnite-api.com/v1/stats/br/v2?image=all&name=${username}`);
    return message.channel.send(`${username} is level ${r.data.data.battlePass.level}.${r.data.data.battlePass.progress}`);
  }
  
  
  
  
  let args = message.content.substring(prefix.length).split(" ");


  switch (args[0]) {
    case "test":
      message.channel.send("Test 18 works!");
      break;

    case "Patch":
      message.channel.send("https://imgur.com/mEab2Sm");
      break;

    case "Creepers-Turtle-Wars-v3.0.1":
      message.channel.send("https://imgur.com/hKrXraM");
      break;

    case "Creepers-Turtle-Wars-v4.0":
      message.channel.send("https://imgur.com/6u32Dxa");
      break;

    case "Creepers Turtle Wars v4.0":
      message.channel.send("https://imgur.com/6u32Dxa");
      break;

    case "log-off":
      message.channel.send("Im still on.");
      break;

    case "embed":
      const embed = new MessageEmbed();
      embed.setTitle("Username");
      embed.setDescription(message.author.username);
      message.channel.send(embed);
      break;

    case "embed-test":
      const embedtest = new MessageEmbed();
      embedtest.setTitle("Info");
      embedtest.setDescription("This message is embeded. This is test 12.");
      embedtest.setColor("#2186DB");
      message.channel.send(embedtest);
      break;

    case "creeper-bot-help":
      const HelpEmbed = new MessageEmbed();
      HelpEmbed.setTitle("Help");
      HelpEmbed.setDescription("All commands and info about the bot will be listed here never!");
      HelpEmbed.setColor("#2186DB");
      message.author.send(HelpEmbed);
      break;

    case "join":
      music.join();
      break;

    case "leave":
      music.leave(message);
      break;
  }

  if (message.content.startsWith('c!shutdown')) {
    if (message.author.id !== '481158632008974337') return message.channel.send("What a idiot!. You don't have permission to preform that action.");

    if (process.env.NODE_ENV === 'production') {
      await message.channel.send('Instance is on **production**. Shutting down to stop counting from breaking...');
      process.exit(1);
    }
    else message.channel.send('Instance is on **development**. Did not shut down.');
  }
});


client.on("messageDelete", async (message) => {
  let logs = await message.guild.fetchAuditLogs({ type: 72 });
  let entry = logs.entries.first();
  if (message.deleted) {
    const channel = <TextChannel>client.channels.cache.get("695646963235946549");
    if (channel) {
      const deletedMessageEmbed = new MessageEmbed()
        .setTitle("Deleted Message")
        .addField("Message", message.content)
        .addField("Author", `${message.author.tag} (${message.author.id})`)
        .addField("Deleter (Can be wrong if message deleted by bot.", `${entry.executor}`)
        .addField("Server", `${message.guild.name} (${message.guild.id})`)
        //@ts-ignore
        .addField("Channel", `${message.channel.name} (${message.channel.id})`)
        .setThumbnail("https://media.graytvinc.com/images/810*455/Coronavirus52.jpg")
        .setColor("FFC433")
        .setTimestamp()
        .setFooter("Corona Bot by Creeper ");
      channel.send(deletedMessageEmbed);
    }
  }
});
client.on("messageUpdate", (oldMessage, newMessage) => {
  const editlogschannel = <TextChannel>client.channels.cache.get("698712954362658857");
  if (oldMessage.content === newMessage.content) {
    return;
  }
  if (editlogschannel) {
    const editEmbed = new MessageEmbed()
      .setTitle("Message Edit")
      .addField("Old Message", oldMessage.content)
      .addField("New Message", newMessage.content)
      .addField("Message Edits (Newest to Oldest)", oldMessage.edits)
      .addField("Message Edits At", oldMessage.editedAt)
      .addField("Message Edited Timestamp", oldMessage.editedTimestamp)
      .addField("Author", `${oldMessage.author.tag} (${oldMessage.author.id})`)
      .addField("Server", `${oldMessage.guild.name} (${oldMessage.guild.id})`)
      //@ts-ignore
      .addField("Channel", `${oldMessage.channel.name} (${oldMessage.channel.id})`)
      .setThumbnail("https://media.graytvinc.com/images/810*455/Coronavirus52.jpg")
      .setColor("FFC433")
      .setTimestamp()
      .setFooter("Corona Bot by Creeper ");

    editlogschannel.send(editEmbed);
  }
});

client.on("ready", () => console.log(`${client.user.tag} has logged in.`));

client.on("messageDeleteBulk", (messages) => {
  const purgedChannel = <TextChannel>client.channels.cache.get("720667264738787340");
  let deletedArray = messages.array();
  deletedArray.reverse();
  deletedArray.forEach(async (message) => {
    if (purgedChannel) {
      const purgedMessageEmbed = new MessageEmbed()
        .setTitle(`${deletedArray.length} Purged Messages`)
        .addField("Message", message.content)
        .addField("Author", `${message.author.tag} (${message.author.id})`)
        .addField("Server", `${message.guild.name} (${message.guild.id})`)
        //@ts-ignore
        .addField("Channel", `${(<string>message.channel.name)} (${message.channel.id})`)
        .addField("Time Message Was Created", `${message.createdAt.toLocaleString()}`)
        .addField("Message Edits", `${message.edits}`)
        .addField("Message Edits Time", `${message.editedAt}`)
        .setThumbnail("https://media.graytvinc.com/images/1920*1080/Coronavirus52.jpg")
        .setColor("FFC433")
        .setTimestamp()
        .setFooter("Corona Bot by Creeper ");
      await purgedChannel.send(purgedMessageEmbed);
    }
  });
});
