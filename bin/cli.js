#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const version = require('../package.json').version;
const createModel = require('../lib/create');
const name = 'create-web-env';

program
  .name(name)
  .version(version)
  .usage('[project-name] [option]');

program.on('--help', () => {
  console.log();
  console.log(`🏷️  Run ${chalk.cyan(`${name} --help`)} for detailed usage of given command.`);
});

program
  .description('📦  Create a new project')
  .argument('[name]', 'project name')
  .option('-f, --force', 'overwrite target directory if it exists')
  .action((name, options) => {
    createModel(name, options);
  })

program.parse(process.argv);
