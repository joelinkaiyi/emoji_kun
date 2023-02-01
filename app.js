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
  async function getWeather(type){
		const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		  });
		  const page = await browser.newPage();
		  await page.goto('https://openweathermap.org/find?q='+type);
		  await page.waitForSelector('#forecast_list_ul > table > tbody > tr:nth-child(1) > td:nth-child(2) > b:nth-child(1) > a')
		  await page.click('#forecast_list_ul > table > tbody > tr:nth-child(1) > td:nth-child(2) > b:nth-child(1) > a')

		  function delay(time) {
			return new Promise(function(resolve) { 
				setTimeout(resolve, time)
			});
		  }
		  await delay(1000)
		  let goWeather=page.mainFrame().url()
		  await page.goto(goWeather)
		  await page.waitForSelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(1) > span')
      const dataTime=await page.evaluate(()=>{
        return document.querySelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(1) > span').textContent
      })
		  await page.waitForSelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(1) > h2')
      const location=await page.evaluate(()=>{
        return document.querySelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(1) > h2').textContent
      })
      await page.waitForSelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(2) > div.current-temp > span')
      const nowTemp=await page.evaluate(()=>{
        return document.querySelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(2) > div.current-temp > span').textContent
      })
      await page.waitForSelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(2) > div.bold')
      const discribe=await page.evaluate(()=>{
        return document.querySelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(2) > div.bold').textContent
      })
      await page.waitForSelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(2) > ul > li:nth-child(1) > div')
      const wind_line=await page.evaluate(()=>{
        return document.querySelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(2) > ul > li:nth-child(1) > div').textContent
      })
      await page.waitForSelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(2) > ul > li:nth-child(2)')
      const atmospheric_pressure=await page.evaluate(()=>{
        return document.querySelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(2) > ul > li:nth-child(2)').textContent
      })
      await page.waitForSelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(2) > ul > li:nth-child(3)')
      const humidity=await page.evaluate(()=>{
        return document.querySelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(2) > ul > li:nth-child(3)').textContent
      })
      await page.waitForSelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(2) > ul > li:nth-child(4)')
      const uv=await page.evaluate(()=>{
        return document.querySelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(2) > ul > li:nth-child(4)').textContent
      })
      await page.waitForSelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(2) > ul > li:nth-child(5)')
      const dew_point=await page.evaluate(()=>{
        return document.querySelector('#weather-widget > div.section-content > div.grid-container.grid-4-5 > div.current-container.mobile-padding > div:nth-child(2) > ul > li:nth-child(5)').textContent
      })
   
		  event.reply(
        dataTime+'\n'
        +location+'\n'
        +nowTemp+'\n'
        +discribe+'\n'
        +'wind:'+wind_line+'\n'
        +'atmospheric pressure:'+atmospheric_pressure+'\n'
        +humidity+'\n'
        +uv+'\n'
        +dew_point
        
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

async function netflix() {
  let browser;
    browser = await puppeteer.launch({ headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox'], });
    const [page] = await browser.pages();
    await page.goto("https://top10.netflix.com/taiwan/tv");
    let dramas = []

    for(let i=1;i<=10;i++) {
      const Netflix_path=`/html/body/div[1]/div/main/section[2]/div/div[5]/div/div[1]/div/table/tbody/tr[${i}]/td[2]`
        await page.waitForXPath(Netflix_path)
  
        const n_result = await page.$x(Netflix_path)
        const nao = await n_result[0].evaluate(x => x.textContent)
  
        console.log(nao)
  
        dramas.push(nao)
        function delay(time) {
          return new Promise(function(resolve) { 
              setTimeout(resolve, time)
          });
        }
    }
    await delay(1000)
    await browser.close()
    return event.reply("Netflix週排行榜:"+'\n'+dramas.map((x, i) => `${i + 1}. ${x}`).join("\n"))
 
}
async function kkbox() {
  const browser = await puppeteer.launch({ 
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const [page] = await browser.pages()
  
  await page.goto('https://kma.kkbox.com/charts/weekly/song?terr=tw&lang=tc&cate=308%27')
  
  let songs = []

  for(let i = 2; i <= 31; i++) {
      const path = `/html/body/div[3]/div/div[2]/ul/li[${i}]/a/div/div[1]/span[1]/span[1]`

      await page.waitForXPath(path)

      const result = await page.$x(path)
      const jao = await result[0].evaluate(x => x.textContent)

      console.log(jao)

      songs.push(jao)
  }
  function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
  }
  await delay(1000)
  await browser.close()
  return event.reply("kkbox日語歌曲週排行榜:"+'\n'+songs.map((x, i) => `${i + 1}. ${x}`).join("\n"))
  
}
async function youtube(video){
 const browser = await puppeteer.launch({ 
      headless:true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const [page] = await browser.pages()
  function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
  }
  await page.goto('https://www.youtube.com/')
  const you_path=await page.$x('/html/body/ytd-app/div[1]/div/ytd-masthead/div[3]/div[2]/ytd-searchbox/form/div[1]/div[1]/input')
  await you_path[0].type(video)
  await delay(500)
 await page.waitForSelector('#search-icon-legacy')
 await page.click('#search-icon-legacy')
 await delay(1000)
  let go_url=page.mainFrame().url();
  await page.goto(go_url);  
const path=`/html/body/ytd-app/div[1]/ytd-page-manager/ytd-search/div[1]/ytd-two-column-search-results-renderer/div[2]/div/ytd-section-list-renderer/div[2]/ytd-item-section-renderer/div[3]/ytd-video-renderer[1]/div[1]/div/div[1]/div/h3/a/yt-formatted-string `
await page.waitForXPath(path);
const you=await page.$x(path)
await you[0].click();

await delay(1000)
  let return_url=page.mainFrame().url()
  event.reply(return_url);

 
 await browser.close();
  
}
	let ph=prefix+'h'
if(event.message.text.includes(){
   let horscope=event.message.text.replace(ph,'')
     switch (horscope) {
    
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
  }
   if(event.message.text===prefix+'n'){
	   netflix();
   }
if(event.message.text===prefix+'kkbox'){
	kkbox();

  let preWeather=prefix+'w'
	if(event.message.text.includes(preWeather)){
		message=event.message.text.replace(preWeather,'').trim()
		getWeather(message)
	}
  let subprefix=prefix+'t'
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
