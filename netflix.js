const puppeteer=require('puppeteer')
async function netflix(event,client,prefix) {
  const message=event.message.text
    if (message === prefix + "n") {

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
      return client.replyMessage(event.replyToken, {
        type: "text",
        text:
          "Netflix週排行榜:" +
          "\n" +
          dramas.map((x, i) => `${i + 1}. ${x}`).join("\n"),
      });
    }
  }
  module.exports={netflix}