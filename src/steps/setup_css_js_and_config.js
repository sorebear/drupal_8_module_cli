const getRequiredValue = require('../functions/get_required_value');
const displayOptions = require('../functions/display_options');
const createNumOptions = require('../functions/create_numeric_options');
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
    const parentLinkMap = {
      1: 'Content Authoring',
      2: 'Development',
      3: 'Search and Metadata',
      4: 'Web Services',
      5: 'System',
      6: 'User Interface',
      7: 'Media',
      8: 'Regional and Language'
    };

    const parentLinks = {
      1: {parent: 'content', url: 'content'},
      2: {parent: 'development', url: 'development'},
      3: {parent: 'search', url: 'search'},
      4: {parent: 'services', url: 'services'},
      5: {parent: 'system', url: 'system'},
      6: {parent: 'ui', url: 'user-interface'},
      7: {parent: 'media', url: 'media'},
      8: {parent: 'regional', url: 'regional'},
    }

    const parentLinkNum = await getRequiredValue(`\nWhich Link Should Parent The Settings Form?\n${displayOptions(parentLinkMap)}`, createNumOptions(parentLinkMap), app);
    app.updateModOptions('parentLink', parentLinks[parentLinkNum]);

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
