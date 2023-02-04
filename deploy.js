'use strict';
const line = require('@line/bot-sdk');
const cron = require("node-cron");
const express = require('express');
const prefix='&'
const todoList=[]
const puppeteer = require("puppeteer");
const { join } = require("path");
const axios = require("axios");
const { type } = require('os');
const { text } = require('body-parser');
const config = {
  channelAccessToken:'8CBpKDc7zV5c358csuwNMh5sEWZELjkXEMTjehR2QscFQwRUHn0QUZp8FxkqlUyRHsoU2DpdhCBe3bI1kbwPxhCHRRUGTi0Z24GSkXhbK1HoUEs0D428ZrLvf9S/QMbzLighqWu/8qFxAFWLV/TExgdB04t89/1O/w1cDnyilFU=',
  channelSecret:'2cbe3d3fb6620db86568f0b431710e83',
};

const client = new line.Client(config);
const bot =new line.Client(config);

const app = express();

app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});


function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {

    return Promise.resolve(null);
  }
  const message = event.message.text;
  const userId = event.source.userId;

  function todolist(){
   
 if (message === '&list') {
    return client.pushMessage(userId, { type: 'text', text: `代辦事項清單：\n${todoList.join('\n')}` });
  }

  if (message.startsWith('&a')) {
    const todo = message.slice(2).trim();
    todoList.push(todo);
    return client.pushMessage(userId, { type: 'text', text: `已加入「${todo}」到代辦事項清單` });
  }

  if (message.startsWith('&c')) {
    const todo = message.slice(2).trim();
    const index = todoList.indexOf(todo);
    if (index !== -1) {
      todoList.splice(index, 1);
      return client.pushMessage(userId, { type: 'text', text: `已將「${todo}」從代辦事項清單中移除` });
    }
    return client.pushMessage(userId, { type: 'text', text: `找不到「${todo}」` });
  }

  return Promise.resolve(null);
}

let task = cron.schedule('0 * * * *', () => {

    todoList.forEach((todo) => {
      client.pushMessage(userId, { type: 'text', text: `您還有未完成的項目「${todo}」，請繼續努力！` });
    });
    task.destroy();
    
  });
  function getGroupid(){
    if(message===prefix+'groupid'){
      return bot.replyMessage(event.replyToken,{
        type:"text",
        text:`群組 ID：${event.source.groupId}`
      })
    }
  }
  function getProfile(){
    if (!message.startsWith('&info')) {
      return Promise.resolve(null);
    }
    
    return bot.getProfile(event.source.userId)
      .then(profile => {
        return bot.replyMessage(event.replyToken, {
          type: 'text',
          text: `UserID：${event.source.userId}\n\n名字：${profile.displayName}\n\n狀態消息：${profile.statusMessage}`
        });
      });
  }
  async function earthquake() {
   if(message===prefix+'eq'){
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://www.cwb.gov.tw/V8/C/E/index.html");
    await page.waitForSelector("section");
    await page.waitForSelector(
      "#eq-1 > td:nth-child(3) > div > a > div > span:nth-child(1)"
    );
    await page.waitForSelector(".eq-row .eq_lv-1");
    await page.waitForSelector(
      "#eq-1 > td:nth-child(3) > div > a > div > ul > li:nth-child(1)"
    );
    await page.waitForSelector(
      "#eq-1 > td:nth-child(3) > div > a > div > ul > li:nth-child(2)"
    );
    await page.waitForSelector(
      "#eq-1 > td:nth-child(3) > div > a > div > ul > li:nth-child(3)"
    );
    const time = await page.evaluate(() => {
      return document.querySelector(
        "#eq-1 > td:nth-child(3) > div > a > div > span:nth-child(1)"
      ).textContent;
    });

    const num = await page.evaluate(() => {
      return document.querySelector("#eq-1 td").textContent;
    });
    const max = await page.evaluate(() => {
      return document.querySelector(".eq-row .eq_lv-1").textContent;
    });
    const location = await page.evaluate(() => {
      return document.querySelector(
        "#eq-1 > td:nth-child(3) > div > a > div > ul > li:nth-child(1)"
      ).textContent;
    });
    const deep = await page.evaluate(() => {
      return document.querySelector(
        "#eq-1 > td:nth-child(3) > div > a > div > ul > li:nth-child(2)"
      ).textContent;
    });
    const level = await page.evaluate(() => {
      return document.querySelector(
        "#eq-1 > td:nth-child(3) > div > a > div > ul > li:nth-child(3)"
      ).textContent;
    });

    await browser.close();
    return bot.replyMessage(event.replyToken,{
      type:'text',
      text:"地震時間:" +time +"\n" +"編號:" +num +"\n" + "最大震度:" +max +"\n" +location +"\n" +deep +"\n" +level
    })
   }
  }
  async function translate() {
   if(message.startsWith(prefix+'t')){
    const translate_text=message.slice(3)
    let browser;

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const [page] = await browser.pages();
    await page.goto("https://translate.google.com");
    await page.type(".er8xn", translate_text);
    await page.waitForSelector(
      "#yDmH0d > c-wiz > div > div.WFnNle > c-wiz > div.OlSOob > c-wiz > div.ccvoYb.EjH7wc > div.AxqVh > div.OPPzxe > c-wiz.sciAJc > div > div.usGWQd > div > div.lRu31 > span.HwtZe > span > span"
    );
    const textResult = await page.evaluate(() => {
      return document.querySelector(
        "#yDmH0d > c-wiz > div > div.WFnNle > c-wiz > div.OlSOob > c-wiz > div.ccvoYb.EjH7wc > div.AxqVh > div.OPPzxe > c-wiz.sciAJc > div > div.usGWQd > div > div.lRu31 > span.HwtZe > span > span"
      ).textContent;
    });

    return bot.replyMessage(event.replyToken,{
      type:'text',
      text:'翻譯結果為:'+textResult
    })
   }
  }
  
      
   
 
async function netflix() {
  if(message===prefix+'n'){
    let browser;
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const [page] = await browser.pages();
  await page.goto("https://top10.netflix.com/taiwan/tv");
  let dramas = [];

  for (let i = 1; i <= 10; i++) {
    const Netflix_path = `/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[${i}]/td[2]`;
    await page.waitForXPath(Netflix_path);

    const n_result = await page.$x(Netflix_path);
    const nao = await n_result[0].evaluate((x) => x.textContent);

    console.log(nao);

    dramas.push(nao);
    function delay(time) {
      return new Promise(function (resolve) {
        setTimeout(resolve, time);
      });
    }
    
  await delay(1000);
  }
  await browser.close();
  return bot.replyMessage(event.replyToken,{
  type:"text",
  text:"Netflix週排行榜:" +"\n" +dramas.map((x, i) => `${i + 1}. ${x}`).join("\n")
  }
    
  );
  }
}
function leaveGroup(){
  const user_id=client.getProfile(event.source.userId);
  const groupid=event.source.groupId
  client.leaveGroup(groupid)
  .then(() => {
    client.replyMessage(event.replyToken,{
      type:'text',
      text:`${user_id}已離開群組`
    })
  })
  .catch((err) => {

  });
}


async function getTaiwanWeather() {
  try {
    const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: 'Taiwan',
        appid: 'a958169936ee2edbb98f382aed2d1ea8',
      },
    });

    const weather = response.data.weather[0].main;
    const temperature = response.data.main.temp - 273.15;

    return `天气：${weather}，温度：${temperature}°C`;
  } catch (error) {
    console.error(error);
    return 'error';
  }
}
     function autoWeather(){
      cron.schedule('0 0 * * *', () => {
        const weather = getTaiwanWeather();
        client.pushMessage(userId, { type: 'text', text: `今天的全台天氣：\n${weather}` });
      });
     }  
function goWeather(){
    if(message===prefix+'w'){
        const weather = getTaiwanWeather();
        client.pushMessage(userId, { type: 'text', text: `現在全台天氣：\n${weather}` });
    }
}

  todolist();
  getProfile();
  earthquake();
  translate();
  netflix();
  getGroupid();
  leaveGroup();
  autoWeather();
 goWeather();
}
const port = process.env.PORT ||3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
