const express = require("express");
const app = express();
const venom = require("venom-bot");
const axios = require("axios");
require("dotenv").config();
venom
  .create({
    session: "session-name", //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("."));
var cron = require("node-cron");
function start(client) {
  cron.schedule("* * * * *", async () => {
    const joke_res = await axios.get(
      "https://icanhazdadjoke.com/slack"
    );

    await client.sendText(`${process.env.WHATSAPP_NUMBER}@c.us`, joke_res.data.attachments[0].text);
  });
  client.onMessage((message) => {
    if (message.body === "Hi" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Welcome Venom 🕷")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  });
}
