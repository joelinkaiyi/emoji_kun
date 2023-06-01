const puppeteer=require('puppeteer')
async function translate(event,client,start) {
  const message=event.message.text
    if (start) {
      const translate_text = message.slice(3);
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

      return client.replyMessage(event.replyToken, {
        type: "text",
        text: "翻譯結果為:" + textResult,
      });
    }
  }
module.exports={translate}