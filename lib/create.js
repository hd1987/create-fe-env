const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const ora = require('ora');
const util = require('util');
const downloadGitRepo = require('download-git-repo');
const semver = require('semver');
const rewriteFiles = require('./rewriteFilesByOptions');
const { LOWEST_NODE_VERSION, REPOSITORY_URI } = require('./constant');


const cwd = process.cwd();

class Creator {
  constructor(name, options) {
    this.options = options;
    this.name = name;
    this.targetDir = name ? path.join(cwd, name) : '';
  };

  async create() {
    const checkNode = this.checkNodeVersion();
    if (!checkNode) return;

    await this.handleEnterProjectName();

    const isOverwrite = await this.handleDirectory();
    if (!isOverwrite) return;

    await this.downloadTemplate();
    await rewriteFiles.action(this.targetDir, this.name);
    await this.showTips();
  };

  checkNodeVersion() {
    const currentVersion = process.version;
    const lowestVersion = LOWEST_NODE_VERSION;
    if (!semver.gte(currentVersion, lowestVersion)) {
      console.log(chalk.yellow(`🏷️  The minimum version of node is required v${lowestVersion}，The current node.js version is ${currentVersion}`));
      return false
    }
    return true;
  }

  async handleEnterProjectName() {
    if (this.name) return true;

    const { name } = await new inquirer.prompt([
      {
        name: 'name',
        type: 'input',
        message: 'Enter project name:',
        filter: (val) => {
          return val.trim();
        },
        validate: (val) => {
          if (val.length > 0) return true;
        },
      }
    ]);

    this.name = name;
    this.targetDir = path.join(cwd, name);
  }

  async handleDirectory() {
    if (fs.existsSync(this.targetDir)) {
      if (this.options.force) {
        await fs.remove(this.targetDir);
      } else {
        const { action } = await new inquirer.prompt([
          {
            name: 'action',
            type: 'list',
            message: 'Target directory already exists Pick an action:',
            choices: [
              {
                name: 'Overwrite',
                value: true,
              },
              {
                name: 'Cancel',
                value: false,
              }
            ],
          }
        ]);
  
        if (action) {
          await fs.remove(this.targetDir);
        } else {
          console.log(chalk.red.bold('🏷️  Termination of creation'));
          return false;
        }
      }
    }
    return true;
  }

  async downloadTemplate() {
    const uri = REPOSITORY_URI;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
    const loading = ora('🚀  Download template...')
    loading.start();
    await this.downloadGitRepo(uri, this.targetDir, { clone: true });
    loading.succeed();
  }

  async showTips() {
    console.log();
    console.log(`🎉  Successfully created project ${chalk.cyan(this.name)}`);
    console.log(`👉  Get started with the following commands:`);
    console.log();
    console.log(`    cd ${chalk.cyan(this.name)}`);
    console.log("    npm install");
    console.log("    npm start");
    console.log();
    console.log(`    .--~~~~~~~~~~~~~~~~~--.     `);
    console.log(`   /--===================--\\   `);
    console.log(`   | |⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺| |    `);
    console.log(`   | | >create-web-env|  | |    `);
    console.log(`   | |                   | |    `);
    console.log(`   | |                   | |    `);
    console.log(`   | |___________________| |    `);
    console.log(`   |                   ::::|    `);
    console.log(`   '======================='    `);
    console.log(`   //-'-'-'-'-'-'-'-'-'-'-\\\\  `);
    console.log(`  //_'_'_'_'_'_'_'_'_'_'_'_\\\\ `);
    console.log(`  [-------------------------]   `);
    console.log(`  \\_________________________/  `);

  }
};

module.exports = async (name, options) => {
  const creator = new Creator(name, options);
  await creator.create();
}
