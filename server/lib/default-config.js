"use strict";

const Confippet = require("electrode-confippet");

/**
 * Set Confippet to use the APP_ENV for configurations
 */
const defaults = Confippet.store();
const deployment = process.env.APP_ENV || "localhost";
console.log(deployment);
defaults._$.compose({
  context: { deployment }
});

module.exports = defaults;
