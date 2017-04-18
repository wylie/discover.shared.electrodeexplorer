"use strict";

/* Handles updating (or creating) the health
 * data for demoing. Implemented in the server
 * as we want to be able to flash updates after
 * the server is up and running, without requiring
 * a restart */
const healthData = {};

healthData.register = (server, options, next) => {

  server.route({
    path: "/health",
    method: "GET",
    handler(request, reply) {
      reply({
        status: "healthy",
        time: new Date()
      });
    }
  });

  return next();
};

healthData.register.attributes = {
  name: "healthData",
  version: "1.0.0"
};

module.exports = healthData;
