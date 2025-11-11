const { defineConfig } = require('cypress');
const { verifyDownloadTasks } = require('cy-verify-downloads');
const { removeDirectory } = require('cypress-delete-downloads-folder');

module.exports = defineConfig({
    projectId: 'zemxwm',
    e2e: {
        setupNodeEvents(on, config) {
            on('task', verifyDownloadTasks);
            on('task', { removeDirectory });
        },
        baseUrl: 'https://automationexercise.com/'
    },
});
