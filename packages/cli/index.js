#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const pkg = require(path.join(__dirname, './package.json'));

program
  .version(pkg.version)
  .option('-d, --dev', '本地在线开发')
  .parse(process.argv);

if(program.dev) {
  require('./src/cmd/dev')();
}
