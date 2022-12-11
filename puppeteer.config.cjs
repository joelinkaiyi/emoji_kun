const { join } = require("path");

module.exports = {
  cacheDirectory: join("/opt/render/project/src/node_modules/puppeteer", ".cache", "puppeteer"),
};
