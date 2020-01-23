const { cli } = require('cli-ux');
const chalk = require('chalk');

const getRequiredValue = require('../functions/get_required_value');
const getDisplayName = require('../functions/get_display_name');
const createNumOptions = require('../functions/create_numeric_options');
const displayOptions = require('../functions/display_options');

module.exports = async (app) => {
  let continueAddingFields = true;
  const fields = [];
  const fieldTypeMap = {
    1: 'checkbox',
    2: 'managed_file',
    3: 'number',
    4: 'select',
    5: 'textarea',
    6: 'textfield',
    7: 'text_format',
  };

  let index = 1;

  while (continueAddingFields) {
    app.log(chalk.bold(chalk.cyanBright(chalk.underline(`\nConfig Form Field #${index}:`))));
    const inputtedName = await cli.prompt(chalk.bold(chalk.cyanBright('Field Title?')));
    const fieldTypeNum = await getRequiredValue(`Field Type?\n${displayOptions(fieldTypeMap)}`, createNumOptions(fieldTypeMap), app);

    let accessibleInJs = 'n'
    if (app.modOptions.includeCssJs) {
      accessibleInJs = await getRequiredValue('\nMake Value Available in JS File? (y/n)', ['y', 'n'], app);
    }

    const fieldTitle = getDisplayName(inputtedName);
    const fieldMachineName = fieldTitle.toLowerCase().split(/\-|\ /).join('_');
    const fieldVarName = fieldTitle[0].toLowerCase() + fieldTitle.slice(1).split(' ').join('');
    const fieldType = fieldTypeMap[fieldTypeNum]
    
    fields.push({
      fieldMachineName,
      fieldVarName,
      fieldTitle,
      fieldType,
      accessibleInJs: accessibleInJs === 'y'
    });

    const addAnotherField = await getRequiredValue('\nAdd Another Field? (y/n)', ['y', 'n'], app);

    if (addAnotherField === 'n') {
      continueAddingFields = false;
    }

    index += 1;
  }

  return fields;
}