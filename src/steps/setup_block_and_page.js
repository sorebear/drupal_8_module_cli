const getRequiredValue = require('../functions/get_required_value');
const createBlockFileStructure = require('../tasks/create_block_file_structure');

module.exports = async (app) => {
  const includeBlock = await getRequiredValue('Include a Block? (y/n)', ['y', 'n'], app);

  if (includeBlock === 'y') {
    createBlockFileStructure(app.modOptions);
  }
}
