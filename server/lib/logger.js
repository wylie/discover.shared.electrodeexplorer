const logger = require("platform.shared.nodelogger");

const options = {
  appName: "dynamichealthui",
  market: "discover",
  domain: "medical",
  level: (process.env.NODE_ENV === 'production') ? 'INFO' : 'ALL',
};

module.exports = logger(options);
