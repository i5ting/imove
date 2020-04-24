#!/usr/bin/env node

const path = require('path');
const prePublish = require('../../../scripts/prepublish');

prePublish('@imove/transform', path.join(__dirname, '../'));
