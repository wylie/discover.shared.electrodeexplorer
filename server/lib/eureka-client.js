const config = require("electrode-confippet").config;
const Eureka = require("eureka-js-client").Eureka;
const logger = require("./logger")(module);

const defaultInstanceId = process.env.HOSTNAME || "localhost";
const defaultAppPort = process.env.appPort || config.$("connections.default.port");

const host = config.$("eureka.host") || `eureka.vpca.us-east-1.eis-delivery${process.env.APP_ENV}.cloud`;
const hostName = config.$("eureka.hostName") || `edge-medical-discover.vpca.us-east-1.eis-delivery${process.env.APP_ENV}.cloud`;

const eurekaClient = new Eureka({
  logger,
  instance: {
    app: config.$("eureka.appName"),
    vipAddress: config.$("eureka.vipAddress"),
    hostName,
    ipAddr: config.$("eureka.ipAddress"),
    port: {
      "$": defaultAppPort,
      "@enabled": true
    },
    instanceId: `${defaultInstanceId}:${config.$("eureka.appName")}:${defaultAppPort}`,
    statusPageUrl: `${defaultInstanceId}:${defaultAppPort}`,
    healthCheckUrl: `${defaultInstanceId}:${defaultAppPort}/health`,
    dataCenterInfo: config.$("eureka.dataCenterInfo")
  },
  eureka: {
    preferIpAddress: config.$("eureka.preferIpAddress"),
    useLocalMetadata: config.$("eureka.useLocalMetadata"),
    host,
    port: config.$("eureka.eurekaPort"),
    servicePath: "/eureka/apps/",
    ec2Region: config.$("eureka.region")
  }
});

module.exports = eurekaClient;
