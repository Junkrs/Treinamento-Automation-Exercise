const { defineConfig } = require('cypress');
const { verifyDownloadTasks } = require('cy-verify-downloads');
const { removeDirectory } = require('cypress-delete-downloads-folder');
const fs = require('fs');

module.exports = defineConfig({
    projectId: 'zemxwm',
    e2e: {
        setupNodeEvents(on, config) {
            on('task', verifyDownloadTasks);
            on('task', { removeDirectory });
            const variables = JSON.parse(fs.readFileSync('cypress/fixtures/variables.json'));
            config.env = {
                ...config.env,
                ...variables,
            };
            return config;
        },
        baseUrl: 'https://automationexercise.com/'
    },
});
