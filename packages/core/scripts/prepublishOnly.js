const path = require('path');
const prePublish = require('../../../scripts/prepublish');

prePublish('@imove/core', path.join(__dirname, '../'));
