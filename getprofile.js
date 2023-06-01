async function getProfile(event,client,prefix) {
  const message=event.message.text
    if (message === prefix + "info") {
      let userId;
      if (event.source.type === "user") {
        userId = event.source.userId;
      } else if (event.source.type === "group") {
        userId = event.source.groupId;
      } else if (event.source.type === "room") {
        userId = event.source.roomId;
      }

      const profile = await client.getProfile(userId);
      const flexMessage = {
        type: "flex",
        altText: "User Info",
        contents: {
          type: "bubble",
          hero: {
            type: "image",
            url: profile.pictureUrl,
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
                text: `${profile.displayName}`,
                size: "xxl",
                weight: "bold",
              },
              {
                type: "text",
                text: `User ID: ${event.source.userId}`,
                size: "md",
                weight: "regular",
              },
              {
                type: "text",
                text: `status: ${profile.statusMessage}`,
                size: "md",
                weight: "regular",
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
                  label: "Line網站首頁",
                  uri: `https://line.me/zh-hant/`,
                },
              },
            ],
          },
        },
      };
      return client.replyMessage(event.replyToken, flexMessage);
    }
  }
  module.exports={getProfile}