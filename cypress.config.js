const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  watchForFileChanges:false,
  defaultCommandTimeout: 40000,
    pageLoadTimeout: 90000,
  //   reporter: 'mochawesome',
  // reporterOptions: {
  //   reportDir: 'cypress/results',
  //   overwrite: false,
  //   html: true,
  //   json: true,
  // },
  e2e: {
   baseUrl: 'https://automationteststore.com',
    chromeWebSecurity: false,
    "redirectionLimit": 30,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
      // implement node event listeners here
    },
  },
});
