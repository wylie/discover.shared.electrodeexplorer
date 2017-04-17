"use strict";
var extendRequire = require("isomorphic-loader/lib/extend-require");
extendRequire()
  .then(function () {
    /*eslint-disable*/
    require("babel-core/register");
    require("electrode-server")(require("electrode-confippet").config, [require("electrode-static-paths")()]);
    /*eslint-enable*/

    if (process.env.APP_ENV) {
      const eurekaClient = require("./lib/eureka-client");  //eslint-disable-line global-require
      eurekaClient.start();

      // Call stop to deregister Eureka instances and exit the process
      const handleDeregister = () => {
        eurekaClient.stop(err => {
          if (err) {
            logger.error(err);
            process.exit(1);
          }
          process.exit(0);
        });
      };

      // If Eureka client registers successfully handle de-registration with SIGTERM and SIGINT
      eurekaClient.once("registered", () => {
        process.on("SIGTERM", handleDeregister);
        process.on("SIGINT", handleDeregister);
      });
    }
  })
  .catch(function (err) {
    console.log("extendRequire failed", err.stack); // eslint-disable-line no-console
  });
