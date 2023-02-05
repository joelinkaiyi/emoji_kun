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
  channelAccessToken:'ImqXwkfn8xKOq9R9wj7yCaPBIzK3SR9+mKNUH4FDI35XMqeQeD9hpZD6tg0IthitOITqrjTnst/J1yglV6J4WTeMxmHyQck9bzeOJ8+dXUmQ8jCYec8S8kaO/nniwQNQhmh57cHlxfyeHxpoXOVGLAdB04t89/1O/w1cDnyilFU=',
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
  async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null)
    }
  
    if (event.message.text === '&info') {
      let userId = ''
      if (event.source.type === 'group') {
        userId = event.source.userId
      } else if (event.source.type === 'room') {
        userId = event.source.userId
      }
      return client.getProfile(userId)
        .then((profile) => {
          const flexMessage = {
            type: 'flex',
            altText: 'User Info',
            contents: {
              type: 'bubble',
              "hero": {
                type: "image",
                url: profile.pictureUrl,
                size: "full",
                aspectRatio: "20:13",
                aspectMode: "cover",
                action: {
                  type: "uri",
                  uri: "http://linecorp.com/"
                }
              },
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: `${profile.displayName}`,
                    size: 'xxl',
                    weight: 'bold'
                  },
                  {
                    type: 'text',
                    text: `User ID: ${userId}`,
                    size: 'md',
                    weight: 'regular'
                  },
                  {
                    type: 'text',
                    text: `status: ${profile.statusMessage}`,
                    size: 'md',
                    weight: 'regular'
                  }
                ]
  
              },
              footer: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'button',
                    action: {
                      type: 'uri',
                      label: 'Line網站首頁',
                      uri: `https://line.me/zh-hant/`
                    }
                  }
                ]
              }
            }
          }
          return client.replyMessage(event.replyToken,{
            flexMessage
          })
        })
    }
  }
  
  async function getbotProfile(){
    if (message === prefix+'botinfo') {
          const flexMessage = {
            type: 'flex',
            altText: 'Bot Info',
            contents: {
              type: 'bubble',
              "hero": {
                type: "image",
                url: `https://images.wallpapersden.com/image/wxl-one-piece-film-red-2022_86604.jpg`,
                size: "full",
                aspectRatio: "20:13",
                aspectMode: "cover",
                action: {
                  type: "uri",
                  uri: "http://linecorp.com/"
                }
              },
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: `顏文字君`,
                    size: 'xxl',
                    weight: 'bold'
                  },
                  {
                    type: "box",
                    layout: "baseline",
                    contents: [
                      {
                        type: "icon",
                        url: "https://i.imgur.com/4G4LFjU.png"
                      },
                      {
                        type: "text",
                        text: `joelinkaiyi@gmail.com`
                      }
                    ]
                  },
                  {
                    type: "box",
                    layout: "baseline",
                    contents: [
                      {
                        type: "icon",
                        url: "https://i.imgur.com/gzfW90Q.png"
                      },
                      {
                        type: "text",
                        text: "https://github.com/joelinkaiyi"
                      }
                    ]
                  }
                ]

              },
              footer: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'button',
                    action: {
                      type: 'uri',
                      label: `Line Developer`,
                      uri: `https://developers.line.biz/zh-hant/`
                    }
                  }
                ]
              }
            }
          }
         
          return client.replyMessage(event.replyToken, flexMessage)
    }
  
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

const getTaiwanWeather = async () => {
  const weatherData = [];
  
  const cities = ['Taipei', 'New Taipei', 'Taoyuan', 'Hsinchu', 'Miaoli', 'Taichung', 'Changhua', 'Nantou', 'Yunlin', 'Chiayi', 'Tainan', 'Kaohsiung', 'Pingtung', 'Yilan', 'Hualien', 'Taitung'];
  
  for (const city of cities) {
  const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},TW&appid=a958169936ee2edbb98f382aed2d1ea8&units=metric`);
  weatherData.push({
  city: response.data.name,
  weather: response.data.weather[0].main,
  temperature: response.data.main.temp
  });
  }
  
  return weatherData;
  };
 if(message===prefix+'w'){
  getTaiwanWeather().then(weatherData => {
    let message = '';
    weatherData.forEach(weather => {
    message +=` ${weather.city}: 今天天氣：${weather.weather}，溫度：${weather.temperature}°C\n`;
    });
    return client.replyMessage(event.replyToken,{
      type:'text',
      text:message
    })
    }); 
 }


     function autoWeather(){
      cron.schedule('0 0 * * *', () => {
        getTaiwanWeather().then(weatherData => {
        let message = '';
        weatherData.forEach(weather => {
        message += `${weather.city}: 今天天氣：${weather.weather}，溫度：${weather.temperature}°C\n`;
        });
        client.pushMessage(userId, { type: 'text', text: message });
        });
        });     
        task.destroy();
     }  
    

  todolist();
  getProfile();
  earthquake();
  translate();
  getbotProfile();
  netflix();
  getGroupid();
  autoWeather();
}
const port = process.env.PORT ||3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
