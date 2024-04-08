const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '7eg8mw',
  e2e: {
    specPattern: "cypress/e2e/**/*.js",
    viewportWidth: 2560,
    viewportHeight: 1664,
    device: "laptop",
    baseUrl:"https://sqlverifier-live-6e21ca0ed768.herokuapp.com/",
    testIsolation: false,
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
