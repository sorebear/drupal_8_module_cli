const getTableColumns = require('../commands/get_table_columns');
const getRequiredValue = require('../functions/get_required_value');
const createTableAndViewStructure = require('../tasks/create_table_and_view_structure');

module.exports = async (app) => {
  const includeDbTable = await getRequiredValue('Include a Custom Database Table? (y/n)', ['y', 'n'], app);
  app.updateModOptions('includeDbTable', includeDbTable === 'y');

  if (includeDbTable === 'y') {
    const tableColumns = await getTableColumns(app);
    app.updateModOptions('tableColumns', tableColumns);

    const includeDbTableInViews = await getRequiredValue('Make Custom Database Values Available for Views? (y/n)', ['y', 'n'], app);
    app.updateModOptions('includeDbTableInViews', includeDbTableInViews === 'y');
  }

  createTableAndViewStructure(app);
}