function getGroupid(event,client,prefix) {
  const message=event.message.text
    if (message === prefix + "groupid") {
      return client.replyMessage(event.replyToken, {
        type: "text",
        text: `群組 ID：${event.source.groupId}`,
      });
    }
  }
  module.exports={getGroupid}