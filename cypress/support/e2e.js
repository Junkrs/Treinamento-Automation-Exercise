import './commands';
import 'cypress-file-upload';
import 'cypress-plugin-api';
require('cy-verify-downloads').addCustomCommand();
require('cypress-delete-downloads-folder').addCustomCommand();
