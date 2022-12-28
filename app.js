const puppeteer = require("puppeteer");
const { join } = require("path");
const prefix = "&";
const linebot = require("linebot");
const { get } = require("request");
const { request } = require("https");
const url = require('url');
const http=require('http');
const express=require('express');
const app=express();



module.exports = {
  cacheDirectory: join(__dirname, ".cache", "puppeteer"),
};
const bot = linebot({
  channelId: "1657546275",
  channelSecret: "2047c6d7dc76857227b58f9ef9ce52bd",
  channelAccessToken:
    "8CBpKDc7zV5c358csuwNMh5sEWZELjkXEMTjehR2QscFQwRUHn0QUZp8FxkqlUyRHsoU2DpdhCBe3bI1kbwPxhCHRRUGTi0Z24GSkXhbK1HoUEs0D428ZrLvf9S/QMbzLighqWu/8qFxAFWLV/TExgdB04t89/1O/w1cDnyilFU=",
});
const linebot_parser=bot.parser();
bot.on("message", function (event) {

  async function earthquake() {
    
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
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

      event
        .reply(
          "地震時間:" +
            time +
            "\n" +
            "編號:" +
            num +
            "\n" +
            "最大震度:" +
            max +
            "\n" +
            location +
            "\n" +
            deep +
            "\n" +
            level
        )
    
  }
 async function weather(city, url) {

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.goto(url);
      await page.waitForSelector("#heading-1 > h4 > a > span.date");
      await page.waitForSelector(
        "#heading-1 > h4 > a > span.Day > span.tem-C.is-active"
      );
      await page.waitForSelector(
        "#heading-1 > h4 > a > span.Night > span.tem-C.is-active"
      );
      await page.waitForSelector("#collapse-1 > div > ol > li:nth-child(2)");
      await page.waitForSelector("#collapse-1 > div > ol > li:nth-child(3)");
      await page.waitForSelector(
        "#collapse-1 > div > ul:nth-child(2) > li:nth-child(2) > span.tem-C.is-active"
      );
      await page.waitForSelector(
        "#collapse-1 > div > ul:nth-child(3) > li:nth-child(2) > span > b"
      );
      const date = await page.evaluate(() => {
        return document.querySelector("#heading-1 > h4 > a > span.date")
          .textContent;
      });
      const day = await page.evaluate(() => {
        return document.querySelector(
          "#heading-1 > h4 > a > span.Day > span.tem-C.is-active"
        ).textContent;
      });
      const night = await page.evaluate(() => {
        return document.querySelector(
          "#heading-1 > h4 > a > span.Night > span.tem-C.is-active"
        ).textContent;
      });
      const day_dis = await page.evaluate(() => {
        return document.querySelector(
          "#collapse-1 > div > ol > li:nth-child(2)"
        ).textContent;
      });
      const night_dis = await page.evaluate(() => {
        return document.querySelector(
          "#collapse-1 > div > ol > li:nth-child(3)"
        ).textContent;
      });
      const bt = await page.evaluate(() => {
        return document.querySelector(
          "#collapse-1 > div > ul:nth-child(2) > li:nth-child(2) > span.tem-C.is-active"
        ).textContent;
      });
      const sun = await page.evaluate(() => {
        return document.querySelector(
          "#collapse-1 > div > ul:nth-child(3) > li:nth-child(2) > span > b"
        ).textContent;
      });
      event
        .reply(
          city +
            "天氣預報:" +
            "\n" +
            "時間:" +
            date +
            "\n" +
            "白天天氣:" +
            day +
            "(C)" +
            "(" +
            day_dis +
            ")" +
            "\n" +
            "晚上天氣:" +
            night +
            "(C)" +
            "(" +
            night_dis +
            ")" +
            "\n" +
            "體感溫度:" +
            bt +
            "(C)" +
            "\n" +
            "紫外線指數:" +
            sun
        )
      

      await browser.close();
   
  }
   async function luck(star, url) {
    
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.goto(url);
      await page.waitForSelector(
        "body > div:nth-child(4) > table:nth-child(3) > tbody > tr:nth-child(2) > td > div.INDEX > div.LEFT > div.FORTUNE_CONTENT > div.FORTUNE_BG > div.FORTUNE_RESOLVE > div.TODAY_CONTENT"
      );
      await page.waitForSelector(
        "body > div:nth-child(4) > table:nth-child(3) > tbody > tr:nth-child(2) > td > div.INDEX > div.LEFT > div.TODAY_FORTUNE > div.TODAY_LUCKY > div:nth-child(1) > h4"
      );
      await page.waitForSelector(
        "body > div:nth-child(4) > table:nth-child(3) > tbody > tr:nth-child(2) > td > div.INDEX > div.LEFT > div.TODAY_FORTUNE > div.TODAY_LUCKY > div:nth-child(2) > h4"
      );
      await page.waitForSelector(
        "body > div:nth-child(4) > table:nth-child(3) > tbody > tr:nth-child(2) > td > div.INDEX > div.LEFT > div.TODAY_FORTUNE > div.TODAY_LUCKY > div:nth-child(3) > h4"
      );
      await page.waitForSelector(
        "body > div:nth-child(4) > table:nth-child(3) > tbody > tr:nth-child(2) > td > div.INDEX > div.LEFT > div.TODAY_FORTUNE > div.TODAY_LUCKY > div:nth-child(4) > h4"
      );
      const destiny = await page.evaluate(() => {
        return document.querySelector(
          "body > div:nth-child(4) > table:nth-child(3) > tbody > tr:nth-child(2) > td > div.INDEX > div.LEFT > div.FORTUNE_CONTENT > div.FORTUNE_BG > div.FORTUNE_RESOLVE > div.TODAY_CONTENT"
        ).textContent;
      });
      const lucky_num = await page.evaluate(() => {
        return document.querySelector(
          "body > div:nth-child(4) > table:nth-child(3) > tbody > tr:nth-child(2) > td > div.INDEX > div.LEFT > div.TODAY_FORTUNE > div.TODAY_LUCKY > div:nth-child(1) > h4"
        ).textContent;
      });
      const lucky_color = await page.evaluate(() => {
        return document.querySelector(
          "body > div:nth-child(4) > table:nth-child(3) > tbody > tr:nth-child(2) > td > div.INDEX > div.LEFT > div.TODAY_FORTUNE > div.TODAY_LUCKY > div:nth-child(2) > h4"
        ).textContent;
      });
      const lucky_direction = await page.evaluate(() => {
        return document.querySelector(
          "body > div:nth-child(4) > table:nth-child(3) > tbody > tr:nth-child(2) > td > div.INDEX > div.LEFT > div.TODAY_FORTUNE > div.TODAY_LUCKY > div:nth-child(3) > h4"
        ).textContent;
      });
      const lucky_time = await page.evaluate(() => {
        return document.querySelector(
          "body > div:nth-child(4) > table:nth-child(3) > tbody > tr:nth-child(2) > td > div.INDEX > div.LEFT > div.TODAY_FORTUNE > div.TODAY_LUCKY > div:nth-child(4) > h4"
        ).textContent;
      });
      let star_result = destiny.replace("今日" + star + "解析", "");
      await browser.close();
      event
        .reply(
          star +
            "今日運勢：" +
            "\n" +
            "幸運數字：" +
            lucky_num +
            "\n" +
            "幸運顏色：" +
            lucky_color +
            "\n" +
            "開運方位：" +
            lucky_direction +
            "\n" +
            "今日吉時：" +
            lucky_time +
            "\n" +
            "\n" +
            star_result.trim()
        )
    
  }
 
  async function translate(str) {

    let browser;
    
      browser = await puppeteer.launch({ headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox'], });
      const [page] = await browser.pages();
      await page.goto("https://translate.google.com");
      await page.type(".er8xn", str);
      await page.waitForSelector(
        "#yDmH0d > c-wiz > div > div.WFnNle > c-wiz > div.OlSOob > c-wiz > div.ccvoYb.EjH7wc > div.AxqVh > div.OPPzxe > c-wiz.sciAJc > div > div.usGWQd > div > div.lRu31 > span.HwtZe > span > span"
      );
      const textResult = await page.evaluate(() => {
        return document.querySelector(
          "#yDmH0d > c-wiz > div > div.WFnNle > c-wiz > div.OlSOob > c-wiz > div.ccvoYb.EjH7wc > div.AxqVh > div.OPPzxe > c-wiz.sciAJc > div > div.usGWQd > div > div.lRu31 > span.HwtZe > span > span"
        ).textContent;
      });

      event
        .reply("翻譯結果為:" + textResult)
  
  }

  
 async function google_map(start,end) {
    let browser;
    
      browser = await puppeteer.launch({ headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox'], });
      const [page] = await browser.pages();
      await page.goto("https://www.google.com.tw/maps/dir///@24.1583379,120.6545017,15zn");
      await page.waitForSelector('#sb_ifc50 > input')
      await page.type("#sb_ifc50 > input",start);
      await page.waitForSelector('#sb_ifc51 > input')
      await page.type('#sb_ifc51 > input',end);
      await page.click('#directions-searchbox-1 > button.mL3xi')
      function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }
     await delay(3000);

      let get_url=page.mainFrame().url()

      
    event.reply(get_url)
      
  }
  async function bill(text,second_text,third_text,fourth_text,fifth_text,sixth_text){
    
      const browser = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.goto('https://invoice.etax.nat.gov.tw/');
      //特別獎
      await page.waitForSelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(1) > td:nth-child(2) > p.etw-tbiggest > span')
      //特獎
      await page.waitForSelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(2) > td:nth-child(2) > p.etw-tbiggest > span')
      //頭獎
      await page.waitForSelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(3) > td:nth-child(2) > p:nth-child(1) > span:nth-child(1)')
      await page.waitForSelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(3) > td:nth-child(2) > p:nth-child(2) > span:nth-child(1)')
      await page.waitForSelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(3) > td:nth-child(2) > p:nth-child(3) > span:nth-child(1)')
      await page.waitForSelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(3) > td:nth-child(2) > p:nth-child(1) > span.font-weight-bold.etw-color-red')
      await page.waitForSelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(3) > td:nth-child(2) > p:nth-child(2) > span.font-weight-bold.etw-color-red')
      await page.waitForSelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(3) > td:nth-child(2) > p:nth-child(3) > span.font-weight-bold.etw-color-red')
      const special_award=await page.evaluate(()=>{
        return document.querySelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(1) > td:nth-child(2) > p.etw-tbiggest > span').textContent
      })
      console.log(special_award)
      const space_award=await page.evaluate(()=>{
        return document.querySelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(2) > td:nth-child(2) > p.etw-tbiggest > span').textContent
      })
    //頭獎
    const head_award_1_black=await page.evaluate(()=>{
      return document.querySelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(3) > td:nth-child(2) > p:nth-child(1) > span:nth-child(1)').textContent
    })
    const head_award_2_black=await page.evaluate(()=>{
      return document.querySelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(3) > td:nth-child(2) > p:nth-child(2) > span:nth-child(1)').textContent
    })
    const head_award_3_black=await page.evaluate(()=>{
      return document.querySelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(3) > td:nth-child(2) > p:nth-child(3) > span:nth-child(1)').textContent
    })
    const head_award_1_red=await page.evaluate(()=>{
      return document.querySelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(3) > td:nth-child(2) > p:nth-child(1) > span.font-weight-bold.etw-color-red').textContent
    })
    const head_award_2_red=await page.evaluate(()=>{
      return document.querySelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(3) > td:nth-child(2) > p:nth-child(2) > span.font-weight-bold.etw-color-red').textContent
    })
    const head_award_3_red=await page.evaluate(()=>{
      return document.querySelector('#etw-container > div > div.container-fluid.etw-bgbox.mb-4 > div.etw-mobile > table > tbody > tr:nth-child(3) > td:nth-child(2) > p:nth-child(3) > span.font-weight-bold.etw-color-red').textContent
    })
    const head_award_1=head_award_1_black+head_award_1_red
    const head_award_2=head_award_2_black+head_award_2_red
    const head_award_3=head_award_3_black+head_award_3_red
      //二獎
      const second_award_1=head_award_1.trim().slice(1,9)
      const second_award_2=head_award_2.trim().slice(1,9)
      const second_award_3=head_award_3.trim().slice(1,9)
      //三獎
      const third_award_1=head_award_1.trim().slice(2,9)
      const third_award_2=head_award_2.trim().slice(2,9)
      const third_award_3=head_award_3.trim().slice(2,9)
      //四獎
      const fourth_award_1=head_award_1.trim().slice(3,9)
      const fourth_award_2=head_award_2.trim().slice(3,9)
      const fourth_award_3=head_award_3.trim().slice(3,9)
      //五獎
      const fifth_award_1=head_award_1.trim().slice(4,9)
      const fifth_award_2=head_award_2.trim().slice(4,9)
      const fifth_award_3=head_award_3.trim().slice(4,9)
    
      console.log(second_award_1)
      if(text.trim()==special_award.trim()){
        event.reply('恭喜你的發票中特別獎!!!╰(*°▽°*)╯')
      }
     else if(text.trim()==space_award.trim()){
      event.reply('恭喜你的發票中特獎!!!(*/ω＼*)')
     }
     else if(text.trim()==head_award_1||text.trim()==head_award_2||text.trim()==head_award_3){
      event.reply('恭喜你的發票中頭獎!!!(❁´◡`❁)')
     }
     else if(second_text.trim()==second_award_1||second_text.trim()==second_award_2||second_text.trim()==second_award_3){
      event.reply('恭喜你的發票中二獎!!!☜(ﾟヮﾟ☜)')
     }
     else if(third_text.trim()==third_award_1||third_text.trim()==third_award_2||third_text.trim()==third_award_3){
      event.reply('恭喜你的發票中三獎!!!(☞ﾟヮﾟ)☞')    
     }
     else if(fourth_text.trim()==fourth_award_1||fourth_text.trim()==fourth_award_2||fourth_text.trim()==fourth_award_3){
      event.reply('恭喜你的發票中四獎!!!φ(゜▽゜*)♪')
     }
     else if(fifth_text.trim()==fifth_award_1||fifth_text.trim()==fifth_award_2||fifth_text.trim()==fifth_award_3){
      event.reply('恭喜你的發票中五獎!!![]~(￣▽￣)~*')
     }
     else if(sixth_text.trim()==head_award_1_red||sixth_text.trim()==head_award_2_red||sixth_text.trim()==head_award_3_red){
      event.reply('恭喜你的發票中六獎!!!q(≧▽≦q)')  
     }
     else{
      event.reply('可惜沒中獎(っ °Д °;)っ，再接再厲吧~')  
     }
      await browser.close();
      
   
  }
function cmd(){
  event.reply('&地震：查詢最近一筆地震資料。'+
  '\n'+'================================'+'\n'
  +'&(縣市)可查詢當地天氣預報資料。ex:&台北'+'\n'
  +'================================'+'\n'+
  '&(星座)可查詢當天星座運勢資料。ex:&牡羊座'+'\n'+
  '&翻譯+(要翻譯的文字)可以使用翻譯功能。ex:&翻譯 你好'+'\n'
  +'================================'+'\n'+'&map+(起點)到(終點)可以使用google map功能。ex:&map 台中火車站到台北101'+'\n'
  +'===================================='+'&發票+(發票的八個數字)可以啟用發票兌獎功能'+'\n'+'========================='+'\n'
  +'&指令：查詢機器人的指令'
  )
}
async function netflix() {
  let browser;
    browser = await puppeteer.launch({ headless: false,args: ['--no-sandbox', '--disable-setuid-sandbox'], });
    const [page] = await browser.pages();
    await page.goto("https://top10.netflix.com/taiwan/tv");
    page.waitForXPath("/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[1]/td[2]")
    const item = await page.$x("/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[1]/td[2]")
    let f1=await item[0].evaluate(x=>x.textContent)
    page.waitForXPath('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[2]/td[2]')
    const item2=await page.$x('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[2]/td[2]')
    let f2=await item2[0].evaluate(x=>x.textContent)
    page.waitForXPath('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[3]/td[2]')
    const item3=await page.$x('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[3]/td[2]')
    let f3=await item3[0].evaluate(x=>x.textContent)
    page.waitForXPath('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[4]/td[2]')
    const item4=await page.$x('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[4]/td[2]')
    let f4=await item4[0].evaluate(x=>x.textContent)
    page.waitForXPath('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[5]/td[2]')
    const item5=await page.$x('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[5]/td[2]')
    let f5=await item5[0].evaluate(x=>x.textContent)
    page.waitForXPath('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[6]/td[2]')
    const item6=await page.$x('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[6]/td[2]')
    let f6=await item6[0].evaluate(x=>x.textContent)
    page.waitForXPath('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[7]/td[2]')
    const item7=await page.$x('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[7]/td[2]')
    let f7=await item7[0].evaluate(x=>x.textContent)
    page.waitForXPath('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[8]/td[2]')
    const item8=await page.$x('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[8]/td[2]')
    let f8=await item8[0].evaluate(x=>x.textContent)
    page.waitForXPath('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[9]/td[2]')
    const item9=await page.$x('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[9]/td[2]')
    let f9=await item9[0].evaluate(x=>x.textContent)
    page.waitForXPath('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[10]/td[2]')
    const item10=await page.$x('/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[10]/td[2]')
    let f10=await item10[0].evaluate(x=>x.textContent)
    event.reply('Netflix週排行榜前10名:'+'\n'+'1.'+f1+'\n'+'\n'+'2.'+f2+'\n'+'\n'+'3.'+f3+'\n'+'\n'+'4.'+f4+'\n'+'\n'+'5.'+f5+'\n'+'\n'+'6.'+f6+'\n'+'\n'+'7.'+f7+'\n'+'\n'+'8.'+f8+'\n'+'\n'+'9.'+f9+'\n'+'\n'+'10.'+f10)	
    await browser.close();
}


  switch (event.message.text) {
    case prefix + "地震":
      earthquake();
      break;
    case prefix + "基隆":
      weather(
        "基隆",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=10017"
      );
      break;
    case prefix + "新北":
      weather(
        "新北",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=65"
      );
      break;
    case prefix + "台北":
      weather(
        "台北",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=63"
      );
      break;
    case prefix + "桃園":
      weather(
        "桃園",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=68"
      );
      break;
    case prefix + "新竹":
      weather(
        "新竹(縣)",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=10004"
      );
      break;
    case prefix + "苗栗":
      weather(
        "苗栗(縣)",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=10005"
      );
      break;
    case prefix + "台中":
      weather(
        "台中",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=66"
      );
      break;
    case prefix + "彰化":
      weather(
        "彰化(縣)",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=10007"
      );
      break;
    case prefix + "南投":
      weather(
        "南投(縣)",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=10008"
      );
      break;
    case prefix + "雲林":
      weather(
        "雲林",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=10009"
      );
      break;
    case prefix + "嘉義":
      weather(
        "嘉義(縣)",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=10010"
      );
      break;
    case prefix + "台南":
      weather(
        "台南",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=67"
      );
      break;
    case prefix + "高雄":
      weather(
        "高雄",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=64"
      );
      break;
    case prefix + "屏東":
      weather(
        "屏東(縣)",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=10013"
      );
      break;
    case prefix + "宜蘭":
      weather(
        "宜蘭",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=10002"
      );
      break;
    case prefix + "花蓮":
      weather(
        "花蓮(縣)",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=10015"
      );
    case prefix + "台東":
      weather(
        "台東(縣)",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=10014"
      );
      break;
    case prefix + "澎湖":
      weather(
        "澎湖",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=10016"
      );
      break;
    case prefix + "金門":
      weather(
        "金門",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=09020"
      );
      break;
    case prefix + "連江":
      weather(
        "連江",
        "https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=09007"
      );
      break;
    case prefix + "水瓶座":
      luck("水瓶座", "https://astro.click108.com.tw/daily_10.php?iAstro=10");
      break;
    case prefix + "雙魚座":
      luck("雙魚座", "https://astro.click108.com.tw/daily_11.php?iAstro=11");
      break;
    case prefix + "牡羊座":
      luck("牡羊座", "https://astro.click108.com.tw/daily_0.php?iAstro=0");
      break;
    case prefix + "金牛座":
      luck("金牛座", "https://astro.click108.com.tw/daily_1.php?iAstro=1");
      break;
    case prefix + "雙子座":
      luck("雙子座", "https://astro.click108.com.tw/daily_2.php?iAstro=2");
      break;
    case prefix + "巨蟹座":
      luck("巨蟹座", "https://astro.click108.com.tw/daily_3.php?iAstro=3");
      break;
    case prefix + "獅子座":
      luck("獅子座", "https://astro.click108.com.tw/daily_4.php?iAstro=4");
      break;
    case prefix + "處女座":
      luck(
        "處女座",
        "https://astro.click108.com.tw/daily_5.php?iAcDay=2022-11-28&iAstro=5"
      );
      break;
    case prefix + "天秤座":
      luck(
        "天秤座",
        "https://astro.click108.com.tw/daily_6.php?iAcDay=2022-11-28&iAstro=6"
      );
      break;
    case prefix + "天蠍座":
      luck(
        "天蠍座",
        "https://astro.click108.com.tw/daily_7.php?iAcDay=2022-11-28&iAstro=7"
      );
      break;
    case prefix + "射手座":
      luck(
        "射手座",
        "https://astro.click108.com.tw/daily_8.php?iAcDay=2022-11-28&iAstro=8"
      );
      break;
    case prefix + "魔羯座":
      luck(
        "魔羯座",
        "https://astro.click108.com.tw/daily_9.php?iAcDay=2022-11-28&iAstro=9"
      );
      break;
   case prefix+'指令':
    cmd();
 case prefix+'netflix':
  netflix()
  }
  let subprefix=prefix+'翻譯'
  if(event.message.text.includes(subprefix)==true){
  let text=event.message.text.replace(subprefix,'')
  translate(text);
  }
  if(event.message.text.includes('&map')){
    let a=event.message.text.indexOf('&')
    let b=event.message.text.indexOf('p')
    let re=event.message.text.slice(a,b+1)
    let re_1=event.message.text.replace(re,'')
    let p1=re_1.indexOf('到')
    let p1_d=re_1.slice(p1,event.message.text.length+1)
    let result_a=re_1.replace(p1_d,'');
    let result_b=re_1.replace(result_a+'到','')
    google_map(result_a,result_b)
  }
  let prebill=prefix+'發票'
  if(event.message.text.includes(prebill)){
    let text=event.message.text.replace(prebill,'')
    let second_text=text.slice(2,9)
    let third_text=text.slice(3,9)
    let fourth_text=text.slice(4,9)
    let fifth_text=text.slice(5,9)
    let sixth_text=text.slice(6,9)
    console.log(text,second_text,third_text,fourth_text,fifth_text,sixth_text)
    bill(text,second_text,third_text,fourth_text,fifth_text,sixth_text)
  }

  
});


app.post('/',linebot_parser)
// Bot所監聽的webhook路徑與port
app.listen(process.env.PORT || 3000, () => {
  console.log("Bot is now online");
});