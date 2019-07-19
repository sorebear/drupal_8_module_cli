const fs = require('fs');
const { cli } = require('cli-ux');
const { Command, flags } = require('@oclif/command');

const checkCreateRootFileFunc = require('./tasks/check_create_root_file');
const deleteFolderRecursive = require('./tasks/delete_folder_recursive');
const getRequiredValue = require('./tasks/get_required_value');
const createBlockFileStructure = require('./tasks/create_block_file_structure');

class DrupalModuleCliCommand extends Command {
  static args = [
    { name: 'moduleName'}
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
    const moduleMachineName = inputtedModuleName.toLowerCase().split('-').join('_');

    this.log(`Building ${moduleDisplayName} as ${moduleMachineName}`);

    if (fs.existsSync(moduleMachineName)) {
      this.log(`Module directory "${moduleMachineName}" already exists.`);
      const overwrite = await getRequiredValue('Would you like to overwrite it?', ['y', 'n'], this);
      if (overwrite === 'n') {
        this.log('Exiting Module installation process.');
        return;
      }

      await deleteFolderRecursive(moduleMachineName);
    }
    
    fs.mkdirSync(moduleMachineName);
    this.createBasicFileStructure(moduleMachineName, moduleDisplayName);

    const includeCssAndJs = await getRequiredValue('Include CSS and JavaScript? (y/n)', ['y', 'n'], this);
    const includeConfigForm = await getRequiredValue('Include a Configuration Form? (y/n)', ['y', 'n'], this);
    const includeBlock = await getRequiredValue('Include a Block? (y/n)', ['y', 'n'], this);

    if (includeCssAndJs === 'y') {
      this.createCssAndJsFileStructure(moduleMachineName, moduleDisplayName);
    }

    if (includeConfigForm === 'y') {
      this.createConfigFormFileStructure(moduleMachineName, moduleDisplayName);
    }

    if (includeBlock === 'y') {
      createBlockFileStructure(moduleMachineName, moduleDisplayName);
    }
  }

  createBasicFileStructure(machineName, displayName) {
    checkCreateRootFileFunc(machineName, displayName, 'info.yml');
    checkCreateRootFileFunc(machineName, displayName, 'module');
  }

  createConfigFormFileStructure(machineName, displayName) {
    const moduleClassPrefix = displayName.split(' ').join('');

    checkCreateRootFileFunc(machineName, displayName, 'links.menu.yml');
    checkCreateRootFileFunc(machineName, displayName, 'permissions.yml');
    checkCreateRootFileFunc(machineName, displayName, 'routing.yml');
    this.checkCreateDir(`${machineName}/src`);
    this.checkCreateDir(`${machineName}/src/Form`);
    this.checkCreateEmptyFile(`${machineName}/src/Form/${moduleClassPrefix}Form.php`);
  }

  createCssAndJsFileStructure(machineName, displayName) {
    checkCreateRootFileFunc(machineName, displayName, 'libraries.yml');
    this.checkCreateDir(`${machineName}/css`);
    this.checkCreateEmptyFile(`${machineName}/css/${machineName}.css`);
    this.checkCreateDir(`${machineName}/js`);
    this.checkCreateEmptyFile(`${machineName}/js/${machineName}.js`);
  }

  checkCreateDir(dirName) {
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
  }

  checkCreateEmptyFile(fileName) {
    if (!fs.existsSync(fileName)) {
      fs.writeFileSync(fileName, '');
    }
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
