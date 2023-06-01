const axios = require("axios");
async function getWeather(){
    const weatherData = [];
    const cities = [
      "Taipei",
      "New Taipei",
      "Taoyuan",
      "Hsinchu",
      "Miaoli",
      "Taichung",
      "Changhua",
      "Nantou",
      "Yunlin",
      "Chiayi",
      "Tainan",
      "Kaohsiung",
      "Pingtung",
      "Yilan",
      "Hualien",
      "Taitung",
    ];

    for (const city of cities) {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},TW&appid=a958169936ee2edbb98f382aed2d1ea8&units=metric`
      );
      weatherData.push({
        city: response.data.name,
        weather: response.data.weather[0].main,
        temperature: response.data.main.temp,
      });
    }

    return weatherData;
  
  
};
 function replyWeather(event,client,prefix) {
    const message=event.message.text
    if (message === prefix + "w") {
        getWeather().then((weatherData) => {
          let message = "";
          weatherData.forEach((weather) => {
            message += ` ${weather.city}: 今天天氣：${weather.weather}，溫度：${weather.temperature}°C\n`;
          });
          return client.replyMessage(event.replyToken, {
            type: "text",
            text: message,
          });
        });
      }
 }
 module.exports={replyWeather}