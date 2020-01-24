const getRequiredValue = require('../functions/get_required_value');
const getRestResources = require('../commands/get_rest_resources');
const createRestResources = require('../tasks/create_rest_resources_structure');

module.exports = async (app) => {
  const includeRestResources = await getRequiredValue('\nInclude Rest Resources? (y/n)', ['y', 'n'], app);
  app.updateModOptions('includeRestResources', includeRestResources === 'y');

  if (includeRestResources === 'y') {
    const restResources = await getRestResources(app);
    app.updateModOptions('restResources', restResources);

    createRestResources(app);
  }
}