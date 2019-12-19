const fs = require('fs');
const { cli } = require('cli-ux');
const { Command, flags } = require('@oclif/command');

const generateDisplayName = require('./tasks/generate_display_name');
const checkCreateRootFile = require('./tasks/check_create_root_file');
const createBasicFileStructure = require('./tasks/create_basic_file_structure');
const deleteFolderRecursive = require('./tasks/delete_folder_recursive');
const getRequiredValue = require('./tasks/get_required_value');
const getFormFields = require('./tasks/get_form_fields');
const createBlockFileStructure = require('./tasks/create_block_file_structure');
const createConfigFormFileStructure = require('./tasks/create_config_form_file_structure');
const createCssAndJsFileStructure = require('./tasks/create_css_js_structure');

class DrupalModuleCliCommand extends Command {
  static args = [
    { name: 'moduleName' }
  ];

  static modOptions = {}

  updateModOptions(key, value) {
    const updatedModOptions = { ...this.modOptions };
    updatedModOptions[key] = value;
    this.modOptions = updatedModOptions;
  }

  async run() {
    const { args } = this.parse(DrupalModuleCliCommand);
    let inputtedModuleName;

    if (!args.moduleName) {
      inputtedModuleName = await cli.prompt('What is your module name?');
    } else {
      inputtedModuleName = args.moduleName;
    }

    const moduleDisplayName = generateDisplayName(inputtedModuleName);
    const moduleMachineName = inputtedModuleName.toLowerCase().split(/-|\ /).join('_');
    const moduleClassPrefix = moduleDisplayName.split(' ').join('');
    const moduleVarName = moduleClassPrefix[0].toLowerCase() + moduleClassPrefix.slice(1);
    const moduleUrl = moduleMachineName.split('_').join('-');

    this.updateModOptions('machineName', moduleMachineName);
    this.updateModOptions('displayName', moduleDisplayName);
    this.updateModOptions('classPrefix', moduleClassPrefix);
    this.updateModOptions('varName', moduleVarName);
    this.updateModOptions('url', moduleUrl);

    this.log(`Building ${moduleDisplayName} as ${moduleMachineName}`);

    if (fs.existsSync(moduleMachineName)) {
      this.log(`Module directory "${moduleMachineName}" already exists.`);
      const overwrite = await getRequiredValue('Would you like to overwrite it? (y/n)', ['y', 'n'], this);
      if (overwrite === 'n') {
        this.log('Exiting Module installation process.');
        return;
      }

      await deleteFolderRecursive(moduleMachineName);
    }
    
    fs.mkdirSync(moduleMachineName);
    
    const includeCssAndJs = await getRequiredValue('Include CSS and JavaScript? (y/n)', ['y', 'n'], this);
    const includeSettingsForm = await getRequiredValue('Include a Settings Form? (y/n)', ['y', 'n'], this);
    
    this.updateModOptions('includeCssJs', includeCssAndJs === 'y');
    this.updateModOptions('includeConfigForm', includeSettingsForm === 'y');

    if (this.modOptions.includeConfigForm) {
      const addFormFields = await getRequiredValue('Add Fields to Config Form? (y/n)', ['y', 'n'], this);
      
      if (addFormFields === 'y') {
        const fields = await getFormFields(this.modOptions, this);
        this.updateModOptions('fields', fields);
      }

      checkCreateRootFile(this.modOptions, 'links.menu.yml');
      checkCreateRootFile(this.modOptions, 'permissions.yml');
      checkCreateRootFile(this.modOptions, 'routing.yml');
      createConfigFormFileStructure(this.modOptions);
    }

    if (this.modOptions.includeCssJs) {
      createCssAndJsFileStructure(this.modOptions);
    }

    const includeBlock = await getRequiredValue('Include a Block? (y/n)', ['y', 'n'], this);

    createBasicFileStructure(this.modOptions);

    if (includeBlock === 'y') {
      createBlockFileStructure(this.modOptions);
    }

    this.log(`Your module "${moduleMachineName}" is ready.`);
    this.log(`Navigate into by running "cd ${moduleMachineName}".`);
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
