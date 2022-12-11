const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const prefix = "&";
const linebot = require("linebot");
const { get } = require("request");
const { request } = require("https");
const url = require("url");
const http = require("http");
const util = require("util");
const bot = linebot({
  channelId: "1657546275",
  channelSecret: "2047c6d7dc76857227b58f9ef9ce52bd",
  channelAccessToken:
    "8CBpKDc7zV5c358csuwNMh5sEWZELjkXEMTjehR2QscFQwRUHn0QUZp8FxkqlUyRHsoU2DpdhCBe3bI1kbwPxhCHRRUGTi0Z24GSkXhbK1HoUEs0D428ZrLvf9S/QMbzLighqWu/8qFxAFWLV/TExgdB04t89/1O/w1cDnyilFU=",
});

bot.on("message", function (event) {
  function earthquake() {
    (async () => {
      const browser = await puppeteer.launch({
        headless: true,
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
        .then(function (data) {})
        .catch(function (error) {});
    })();
  }
  function weather(city, url) {
    (async () => {
      const browser = await puppeteer.launch({
        headless: true,
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
        .then(function (data) {})
        .catch(function (error) {});
      console.log(
        date +
          "\n" +
          day +
          "\n" +
          night +
          "\n" +
          day_dis +
          "\n" +
          night_dis +
          "\n" +
          bt +
          "\n" +
          sun
      );

      await browser.close();
    })();
  }
  function luck(star, url) {
    (async () => {
      const browser = await puppeteer.launch({
        headless: true,
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
        .then(function (data) {})
        .catch(function (error) {});
    })();
  }
  function kktv() {
    (async () => {
      const browser = await puppeteer.launch({
        headless: true,
      });
      const page = await browser.newPage();
      await page.goto("https://kktv.me/titleList/ranking");
      // await page.waitForSelector('#__next > div:nth-child(1) > div.layout > main > div > div.sc-9da1d5dc-3.hSxxBn > div > div:nth-child(2) > div.block-list__main-container > div:nth-child(1) > div > div.cover-view__desc');
      // await page.waitForSelector('#__next > div:nth-child(1) > div.layout > main > div > div.sc-9da1d5dc-3.hSxxBn > div > div:nth-child(2) > div.block-list__main-container > div:nth-child(2) > div > div.cover-view__desc')
      const get = await page.$$eval("#desc-title", (divs) => divs.length);
      const result = await page.$$eval("desc-title", (get) => {
        return get.map((get) => get.textContent);
      });
      console.log(result);
      await browser.close();
      event
        .reply(result)
        .then(function (data) {})
        .catch(function (error) {});
    })();
  }
  function translate(str) {
    let browser;
    (async () => {
      browser = await puppeteer.launch({ headless: true });
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
        .then(function (data) {})
        .catch(function (error) {});
    })()
      .catch((err) => console.error(err))
      .finally(() => browser?.close());
  }

  function google_map(start, end) {
    let browser;
    (async () => {
      browser = await puppeteer.launch({ headless: true });
      const [page] = await browser.pages();
      await page.goto(
        "https://www.google.com.tw/maps/dir///@24.1583379,120.6545017,15zn"
      );
      await page.waitForSelector("#sb_ifc50 > input");
      await page.type("#sb_ifc50 > input", start);
      await page.waitForSelector("#sb_ifc51 > input");
      await page.type("#sb_ifc51 > input", end);
      await page.click("#directions-searchbox-1 > button.mL3xi");
      function delay(time) {
        return new Promise(function (resolve) {
          setTimeout(resolve, time);
        });
      }
      await delay(7000);

      let get_url = page.mainFrame().url();

      event
        .reply(get_url)
        .then(function (data) {})
        .catch(function (error) {});
    })()
      .catch((err) => console.error(err))
      .finally(() => browser?.close());
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
    case prefix + "美元":
      change_money();
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
    case prefix + "kktv":
      kktv();
      break;
  }
  let subprefix = prefix + "翻譯";
  if (event.message.text.includes(subprefix) == true) {
    let text = event.message.text.replace(subprefix, "");
    translate(text);
  }
  if (event.message.text.includes("&map")) {
    let a = event.message.text.indexOf("&");
    let b = event.message.text.indexOf("p");
    let re = event.message.text.slice(a, b + 1);
    let re_1 = event.message.text.replace(re, "");
    let p1 = re_1.indexOf("到");
    let p1_d = re_1.slice(p1, event.message.text.length + 1);
    let result_a = re_1.replace(p1_d, "");
    let result_b = re_1.replace(result_a + "到", "");
    google_map(result_a, result_b);
  }
});

// Bot所監聽的webhook路徑與port
bot.listen("/linewebhook", 3000, function () {
  console.log("BOT is now online");
});
