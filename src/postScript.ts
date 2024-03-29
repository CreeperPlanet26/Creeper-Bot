import axios from "axios";

import { Client, Intents, TextChannel } from "discord.js";
import express from "express";

require("dotenv").config();

const client = new Client({ restTimeOffset: 75, intents: new Intents(["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS",]) });
client.login(process.env.NODE_ENV == 'production' ? process.env.BOT_TOKEN : process.env.DEV_BOT_TOKEN);

const postScriptSpawnedAt = new Date().toISOString();
const version = `v${require("../package.json").version}`;


const app = express();
const port = process.env.PORT || 3001;
app.get("/", (req, res) => res.status(200).json({ msg: 'message from spawned script. old version of the app', postScriptSpawnedAt }));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)

    client.on("ready", () => {
        const c = (<TextChannel>client.channels.cache.get('1045086199053820004')) || (<TextChannel>client.channels.cache.get("725143127723212830"));
        c.send("Post script has spawned!!!")

        setInterval(async () => {
            console.log('this is a test')
            try {
                if (process.env.NODE_ENV === "production" && process.env?.HOST_TYPE === "render") {
                    // console.log(`Fetching the render url from post script. This shouldn't be happening for a long amount of time. This script spawned at: ${postScriptSpawnedAt}`);
                    // const { data } = await axios.get('https://creeper-bot.onrender.com/');
                    // console.log(data);
                    // if (data.serverStartedAt) {
                    //     c.send(`\`${version}\` there is a serverStartedAt prop. This means new server is ready: \`${data.serverStartedAt}\``)
                    //     c.send("shutting down the old server that's running the post script...")
                    //     console.log("shutting down the old server that's running the post script...")
                    //     process.send("SHUTDOWN_SERVER")
                    // }

                    // else console.log(`${version} there is not serverStartedAt: ${JSON.stringify(data, null, 2)}`)

                    console.log(`Fetching the render url from post script. This shouldn't be happening for a long amount of time. This script spawned at: ${postScriptSpawnedAt}`);
                    axios.get('https://creeper-bot.onrender.com/')

                }
            }
            catch (e) {
                console.log(e.message);
            }
        }, 600000) // 15 seconds

        const countChannel = <TextChannel>client.channels.cache.get('1045085618683781320')
        let count = 1;
        process.env.NODE_ENV === "production" && setInterval(() => {
            if (count === 1) countChannel.send("**---------------------------------------------**")
            countChannel.send(`[\`${postScriptSpawnedAt}\`] ---- count: ${count} ---- [\`${version}\`]`)
            count++
        }, 10000)
    })


});
