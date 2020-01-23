const fs = require('fs');
const { cli } = require('cli-ux');
const chalk = require('chalk');

const getDisplayName = require('../functions/get_display_name');
const getRequiredValue = require('../functions/get_required_value');
const deleteFolderRecursive = require('../tasks/delete_folder_recursive');

module.exports = async (app) => {
  const inputtedModuleName = await cli.prompt(chalk.bold(chalk.cyanBright('What is your module name?')));
  
  const moduleDisplayName = getDisplayName(inputtedModuleName);
  const moduleMachineName = inputtedModuleName.toLowerCase().split(/-|\ /).join('_');
  const moduleClassPrefix = moduleDisplayName.split(' ').join('');
  const moduleVarName = moduleClassPrefix[0].toLowerCase() + moduleClassPrefix.slice(1);
  const moduleUrl = moduleMachineName.split('_').join('-');
  
  app.updateModOptions('machineName', moduleMachineName);
  app.updateModOptions('displayName', moduleDisplayName);
  app.updateModOptions('classPrefix', moduleClassPrefix);
  app.updateModOptions('varName', moduleVarName);
  app.updateModOptions('url', moduleUrl);
  
  app.log(`🛠  Building module ${chalk.bold(chalk.cyanBright(`"${moduleDisplayName}"`))} as ${chalk.bold(chalk.cyanBright(`"${moduleMachineName}"`))}`);
  
  if (fs.existsSync(moduleMachineName)) {
    app.log(chalk.bold(chalk.redBright(`\n❌ Module directory "${moduleMachineName}" already exists.`)));
    const overwrite = await getRequiredValue('Would you like to overwrite it? (y/n)', ['y', 'n'], app);
    if (overwrite === 'n') {
      app.log(chalk.bold(chalk.redBright('\n❌ Exiting Module installation process.\n\n')));
      return false;
    }
  
    await deleteFolderRecursive(moduleMachineName);
  }
  
  fs.mkdirSync(moduleMachineName);

  return true;
}
