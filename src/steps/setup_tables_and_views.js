const { cli } = require('cli-ux');
const chalk = require('chalk');

const getDisplayName = require('../functions/get_display_name');
const getTableColumns = require('../commands/get_table_columns');
const getRequiredValue = require('../functions/get_required_value');
const createTableAndViewStructure = require('../tasks/create_table_and_view_structure');

module.exports = async (app) => {
  const includeDbTable = await getRequiredValue('\nInclude a Custom Database Table? (y/n)', ['y', 'n'], app);
  app.updateModOptions('includeDbTable', includeDbTable === 'y');

  if (includeDbTable === 'y') {
    const inputtedTableName = await cli.prompt(chalk.bold(chalk.cyanBright('\nWhat is your Custom Table Name?')));
    const tableDisplayName = getDisplayName(inputtedTableName);
    const tableMachineName = inputtedTableName.toLowerCase().split(/-|\ /).join('_');

    app.updateModOptions('tableDisplayName', tableDisplayName);
    app.updateModOptions('tableMachineName', tableMachineName);

    const tableColumns = await getTableColumns(app);
    app.updateModOptions('tableColumns', tableColumns);

    const includeDbTableInViews = await getRequiredValue('\nMake Custom Database Values Available for Views? (y/n)', ['y', 'n'], app);
    app.updateModOptions('includeDbTableInViews', includeDbTableInViews === 'y');
  }

  createTableAndViewStructure(app);
}