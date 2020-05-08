#!/usr/bin/env node

const path = require('path');
const prePublish = require('../../../scripts/prepublish');

prePublish('@imove/json-schema-editor', path.join(__dirname, '../'));
