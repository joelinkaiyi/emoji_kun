"use strict";
const line = require("@line/bot-sdk");
require('dotenv').config()
const express = require("express");
const prefix = "&";
const profile=require('./getprofile')
const botProfile=require('./getbotprofile')
const weather=require('./getWeather')
const earthquake=require('./earthquake')
const netflix=require('./netflix')
const groupid=require('./groupid')
const translate=require('./translate')
const todoList=require('./to-do-list')
const config={ channelSecret:process.env.CHANNEL_SECRET, channelAccessToken:process.env.CHANNEL_ACCESS_TOKEN }
const client=new line.Client(config);
const app = express();
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }
  
  todoList.todolist(event,client)
profile.getProfile(event,client,prefix)
botProfile.getbotProfile(event,client,prefix)
weather.replyWeather(event,client,prefix)
earthquake.earthquake(event,client,prefix)
netflix.netflix(event,client,prefix)
translate.translate(event,client,prefix,start)
groupid.getGroupid(event,client,prefix)
}
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
