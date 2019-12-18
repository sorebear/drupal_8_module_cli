const { cli } = require('cli-ux');
const getRequiredValue = require('./get_required_value');

module.exports = async function(thisVal) {
  let continueAddingFields = true;
  const fields = [];
  const fieldTypeMap = {
    1: 'textfield',
    2: 'checkbox',
    3: 'text_format',
  };

  while (continueAddingFields) {
    const fieldTitle = await cli.prompt('Field Title?');
    const fieldDescription = await cli.prompt('Field Description?');
    const fieldTypeNum = await getRequiredValue('Field Type?\n1. textfield\n2. checkbox\n3. text_format\n', ['1', '2', '3'], thisVal);
    const accessibleInJs = await getRequiredValue('Make Value Available in JS File? (y/n)', ['y', 'n'], thisVal);

    const fieldName = fieldTitle.toLowerCase().split(' ').join('_').split('-').join('_');
    const fieldType = fieldTypeMap[fieldTypeNum]
    
    fields.push({
      fieldName,
      fieldTitle,
      fieldDescription,
      fieldType,
      accessibleInJs
    });

    const addAnotherField = await getRequiredValue('\nAdd Another Field? (y/n)', ['y', 'n'], thisVal);

    if (addAnotherField === 'n') {
      continueAddingFields = false;
    }
  }

  return fields;
}