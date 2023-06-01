async function getbotProfile(event,client,prefix) {
  const message=event.message.text
    if (message === prefix + "botinfo") {
      const flexMessage = {
        type: "flex",
        altText: "Bot Info",
        contents: {
          type: "bubble",
          hero: {
            type: "image",
            url: `https://images.wallpapersden.com/image/wxl-one-piece-film-red-2022_86604.jpg`,
            size: "full",
            aspectRatio: "20:13",
            aspectMode: "cover",
            action: {
              type: "uri",
              uri: "http://linecorp.com/",
            },
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: `顏文字君`,
                size: "xxl",
                weight: "bold",
              },
              {
                type: "box",
                layout: "baseline",
                contents: [
                  {
                    type: "icon",
                    url: "https://i.imgur.com/4G4LFjU.png",
                  },
                  {
                    type: "text",
                    text: `joelinkaiyi@gmail.com`,
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                contents: [
                  {
                    type: "icon",
                    url: "https://i.imgur.com/gzfW90Q.png",
                  },
                  {
                    type: "text",
                    text: "https://dishippo.vercel.app/",
                  },
                ],
              },
            ],
          },
          footer: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "button",
                action: {
                  type: "uri",
                  label: `Line Developer`,
                  uri: `https://developers.line.biz/zh-hant/`,
                },
              },
            ],
          },
        },
      };

      return client.replyMessage(event.replyToken, flexMessage);
    }
  }
module.exports={getbotProfile}