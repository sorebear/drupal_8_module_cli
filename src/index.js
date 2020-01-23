const { Command, flags } = require('@oclif/command');
const chalk = require('chalk');

const initialSetup = require('./steps/setup_inital');
const setupCssJsAndConfigForm = require('./steps/setup_css_js_and_config');
const setupTablesAndViews = require('./steps/setup_tables_and_views');
const setupBlockAndPage = require('./steps/setup_block_and_page');
const createInfoAndModuleFile = require('./tasks/create_info_and_module_file');

class DrupalModuleCliCommand extends Command {
  static modOptions = {}

  updateModOptions(key, value) {
    const updatedModOptions = { ...this.modOptions };
    updatedModOptions[key] = value;
    this.modOptions = updatedModOptions;
  }

  async run() {
    const initComplete = await initialSetup(this);

    if (!initComplete) {
      return;
    }
    
    await setupCssJsAndConfigForm(this);
    await setupTablesAndViews(this);
    await setupBlockAndPage(this);

    createInfoAndModuleFile(this.modOptions);

    this.log(`\n✅ Your module ${chalk.bold(chalk.cyanBright(`"${this.modOptions.machineName}"`))} is ready.`);
    this.log(`✅ Navigate into it by running ${chalk.bold(chalk.cyanBright(`"cd ${this.modOptions.machineName}"`))}.\n\n`);
  }
}

DrupalModuleCliCommand.description = `Describe the command here
...
Extra documentation goes here
`

DrupalModuleCliCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = DrupalModuleCliCommand
