const { cli } = require('cli-ux');
const chalk = require('chalk');

const getRequiredValue = require('../functions/get_required_value');
const getDisplayName = require('../functions/get_display_name');
const createNumOptions = require('../functions/create_numeric_options');
const displayOptions = require('../functions/display_options');

module.exports = async (app) => {
  let continueAddingColumns = true;
  const columns = [];
  const columnTypeMap = {
    1: 'varchar',
    2: 'int',
    3: 'tinyint',
  };

  let firstIteration = true;
  let index = 1;

  while (continueAddingColumns) {
    if (index === 1) {
      app.log(chalk.bold(chalk.cyanBright(chalk.underline(`\nTable "${app.modOptions.tableDisplayName}" Primary Column:`))));
    } else {
      app.log(chalk.bold(chalk.cyanBright(chalk.underline(`\nTable "${app.modOptions.tableDisplayName}" Column #${index}:`))));
    }
    const inputtedName = await cli.prompt(chalk.bold(chalk.cyanBright('Column Title?')));
    const columnTypeNum = firstIteration ? 0 : await getRequiredValue(`Column Type?\n${displayOptions(columnTypeMap)}`, createNumOptions(columnTypeMap), app);

    const columnTitle = getDisplayName(inputtedName);
    const columnMachineName = columnTitle.toLowerCase().split(/\-|\ /).join('_');
    const columnType = firstIteration ? 'primary' : columnTypeMap[columnTypeNum]
    
    if (firstIteration) {
      firstIteration = false;
    }

    columns.push({
      columnMachineName,
      columnTitle,
      columnType,
    });

    const addAnotherColumn = await getRequiredValue('\nAdd Another Table Column? (y/n)', ['y', 'n'], app);

    if (addAnotherColumn === 'n') {
      continueAddingColumns = false;
    }
  }

  return columns;
}