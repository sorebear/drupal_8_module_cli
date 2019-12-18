const fs = require('fs');
const { cli } = require('cli-ux');
const { Command, flags } = require('@oclif/command');

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

  createDisplayName(inputtedName) {
    const nameArr = inputtedName.split(/_|-/);
    return nameArr.map((word) => {
      const wordArr = word.split('');
      wordArr[0] = wordArr[0].toUpperCase();
      return wordArr.join('');
    }).join(' ');
  }

  async run() {
    const { args } = this.parse(DrupalModuleCliCommand);
    let inputtedModuleName;

    if (!args.moduleName) {
      inputtedModuleName = await cli.prompt('What is your module name?');
    } else {
      inputtedModuleName = args.moduleName;
    }

    const moduleDisplayName = this.createDisplayName(inputtedModuleName);
    const moduleMachineName = inputtedModuleName.toLowerCase().split('-').join('_').split(' ').join('_');

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
    
    createBasicFileStructure(moduleMachineName, moduleDisplayName);

    const includeCssAndJs = await getRequiredValue('Include CSS and JavaScript? (y/n)', ['y', 'n'], this);
    const includeSettingsForm = await getRequiredValue('Include a Settings Form? (y/n)', ['y', 'n'], this);
    const includeBlock = await getRequiredValue('Include a Block? (y/n)', ['y', 'n'], this);
    

    if (includeSettingsForm === 'y') {
      const addFormFields = await getRequiredValue('Add Fields to Config Form? (y/n)', ['y', 'n'], this);

      let fields = [];
      if (addFormFields === 'y') {
        fields = await getFormFields(this);
      }

      checkCreateRootFile(moduleMachineName, moduleDisplayName, 'links.menu.yml');
      checkCreateRootFile(moduleMachineName, moduleDisplayName, 'permissions.yml');
      checkCreateRootFile(moduleMachineName, moduleDisplayName, 'routing.yml');
      createConfigFormFileStructure(moduleMachineName, moduleDisplayName, fields);
    }

    if (includeCssAndJs === 'y') {
      createCssAndJsFileStructure(moduleMachineName, moduleDisplayName);
    }

    if (includeBlock === 'y') {
      createBlockFileStructure(moduleMachineName, moduleDisplayName);
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
