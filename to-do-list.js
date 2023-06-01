const cron = require("node-cron");
const todoList = [];
function todolist(event,client) {
    const message=event.message.text
    const userId = event.source.userId;
   
    if (message === "&list") {
      return client.pushMessage(userId, {
        type: "text",
        text: `代辦事項清單：\n${todoList.join("\n")}`,
      });
    }
    if (message.startsWith("&a")) {
      const todo = message.slice(2).trim();
      todoList.push(todo);
      return client.pushMessage(userId, {
        type: "text",
        text: `已加入「${todo}」到代辦事項清單`,
      });
    }

    if (message.startsWith("&c")) {
      const todo = message.slice(2).trim();
      const index = todoList.indexOf(todo);
      if (index !== -1) {
        todoList.splice(index, 1);
        return client.pushMessage(userId, {
          type: "text",
          text: `已將「${todo}」從代辦事項清單中移除`,
        });
      }
      return client.pushMessage(userId, {
        type: "text",
        text: `找不到「${todo}」`,
      });
    }

    return Promise.resolve(null);
  }

  let task = cron.schedule("0 * * * *", () => {
    todoList.forEach((todo) => {
      client.pushMessage(userId, {
        type: "text",
        text: `您還有未完成的項目「${todo}」，請繼續努力！`,
      });
    });
    task.destroy();
  });
 module.exports={todolist}