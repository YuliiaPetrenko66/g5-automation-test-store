const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  watchForFileChanges:false,
  defaultCommandTimeout: 40000,
    pageLoadTimeout: 90000,
  e2e: {
    baseUrl: 'https://automationteststore.com',
    chromeWebSecurity: false,
    "redirectionLimit": 30,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
