const {defineConfig} = require("cypress");

module.exports = defineConfig({
  projectId: 'o4t7ca',
    pageLoadTimeout: 15000,

    env: {
        firstCookieValue: "firstValue",
    },

    e2e: {
        setupNodeEvents(on, config) {
            return config;
        }
    },
});
