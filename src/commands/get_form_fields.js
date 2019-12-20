const { cli } = require('cli-ux');

const getRequiredValue = require('../functions/get_required_value');
const getDisplayName = require('../functions/get_display_name');
const createNumOptions = require('../functions/create_numeric_options');
const displayOptions = require('../functions/display_options');

module.exports = async function(modOptions, thisVal) {
  let continueAddingFields = true;
  const fields = [];
  const fieldTypeMap = {
    1: 'checkbox',
    2: 'managed_file',
    3: 'number',
    4: 'select',
    5: 'textfield',
    6: 'text_format',
  };

  while (continueAddingFields) {
    const inputtedName = await cli.prompt('Field Title?');
    const fieldTypeNum = await getRequiredValue(`Field Type?\n${displayOptions(fieldTypeMap)}`, createNumOptions(fieldTypeMap), thisVal);

    let accessibleInJs = 'n'
    if (modOptions.includeCssJs) {
      accessibleInJs = await getRequiredValue('Make Value Available in JS File? (y/n)', ['y', 'n'], thisVal);
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

    const addAnotherField = await getRequiredValue('\nAdd Another Field? (y/n)', ['y', 'n'], thisVal);

    if (addAnotherField === 'n') {
      continueAddingFields = false;
    }
  }

  return fields;
}