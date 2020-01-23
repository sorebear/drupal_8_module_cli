const chalk = require('chalk');

const getRequiredValue = require('../functions/get_required_value');
const checkCreateRootFile = require('../tasks/check_create_root_file');
const getFormFields = require('../commands/get_form_fields');
const createConfigFormFileStructure = require('../tasks/create_config_form_file_structure');
const createCssAndJsFileStructure = require('../tasks/create_css_js_structure');

module.exports = async (app) => {
  const includeCssAndJs = await getRequiredValue('\nInclude CSS and JavaScript? (y/n)', ['y', 'n'], app);
  const includeSettingsForm = await getRequiredValue('\nInclude a Settings Form? (y/n)', ['y', 'n'], app);
  
  app.updateModOptions('includeCssJs', includeCssAndJs === 'y');
  app.updateModOptions('includeConfigForm', includeSettingsForm === 'y');

  if (app.modOptions.includeConfigForm) {
    const addFormFields = await getRequiredValue('\nAdd Fields to Config Form? (y/n)', ['y', 'n'], app);
    
    if (addFormFields === 'y') {
      const fields = await getFormFields(app);
      app.updateModOptions('fields', fields);
    }

    checkCreateRootFile(app.modOptions, 'links.menu.yml');
    checkCreateRootFile(app.modOptions, 'permissions.yml');
    checkCreateRootFile(app.modOptions, 'routing.yml');
    createConfigFormFileStructure(app.modOptions);
  }

  if (app.modOptions.includeCssJs) {
    createCssAndJsFileStructure(app.modOptions);
  }
}
