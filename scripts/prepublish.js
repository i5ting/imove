#!/usr/bin/env node

const childProcess = require('child_process');
const ora = require('ora');

const timeout = 1000 * 60 * 2;
const buildCommand = `npm run build`;

function prePublish(packageAlias, packagePath) {
  const spinner = ora(`Building "${packageAlias}" library`).start();

  try {
    childProcess.execSync(buildCommand, { timeout, cwd: packagePath });
  } catch (error) {
    spinner.fail(`Could not finish building "${packageAlias}" library`);
    process.exit();
  }

  spinner.succeed(`Finished building "${packageAlias}" library`);
}

module.exports = prePublish;
