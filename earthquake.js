const puppeteer=require('puppeteer')
  async function earthquake(event,client,prefix) {
    const message=event.message.text
    if (message === prefix + "eq") {
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
      return client.replyMessage(event.replyToken, {
        type: "text",
        text:
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
          level,
      });
    }
  }
  module.exports={earthquake}