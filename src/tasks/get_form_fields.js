const { cli } = require('cli-ux');

const getRequiredValue = require('./get_required_value');
const generateDisplayName = require('../tasks/generate_display_name');

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
    const fieldTypeNum = await getRequiredValue('Field Type?\n1. checkbox\n2. managed_file\n3. number\n4. select\n5. textfield\n6. text_format\n', ['1', '2', '3', '4', '5', '6'], thisVal);

    let accessibleInJs = 'n'
    if (modOptions.includeCssJs) {
      accessibleInJs = await getRequiredValue('Make Value Available in JS File? (y/n)', ['y', 'n'], thisVal);
    }

    const fieldTitle = generateDisplayName(inputtedName);
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