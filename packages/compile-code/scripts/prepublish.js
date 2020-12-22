#!/usr/bin/env node

const path = require('path');
const prePublish = require('../../../scripts/prepublish');

prePublish('@imove/compile-code', path.join(__dirname, '../'));
