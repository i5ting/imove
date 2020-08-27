#!/usr/bin/env node
const path = require('path');
const cmds = require('./src/cmd');
const program = require('commander');
const getConfig = require('./src/utils/getConfig');
const pkg = require(path.join(__dirname, './package.json'));

program
  .version(pkg.version)
  .option('-d, --dev', '本地开发')
  .option('-i, --init', '初始化配置文件')
  .parse(process.argv);

Object.keys(cmds).forEach((cmd) => {
  const CmdCtor = cmds[cmd];
  if(program[cmd]) {
    const cmdInst = new CmdCtor({config: getConfig()});
    cmdInst.run();
  }
});
