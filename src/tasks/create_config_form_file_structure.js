const fs = require('fs');
const checkCreateDir = require('./check_create_dir');
const setConfigField = require('../templates/setConfigField');
const configFormTemplate = require('../templates/ConfigForm.php');

const fieldTemplates = require('../templates/fields');

module.exports = (modOptions) => {
  const { displayName, fields = [], machineName } = modOptions;
  const moduleClassPrefix = displayName.split(' ').join('');
  const moduleUrl = machineName.split('_').join('-') ;
 
  checkCreateDir(`${machineName}/src`);
  checkCreateDir(`${machineName}/src/Form`);

  let formFields = '';
  fields.forEach((field) => {
    let fieldTemplate = fieldTemplates[field.fieldType];

    fieldTemplate = fieldTemplate.replace(/<%fieldMachineName%>/g, field.fieldMachineName);
    fieldTemplate = fieldTemplate.replace(/<%fieldTitle%>/g, field.fieldTitle);
    formFields += fieldTemplate;
  });

  let setFormFields = '';
  fields.forEach((field) => {
    let setFieldTemplate = setConfigField;
    setFieldTemplate = setFieldTemplate.replace(/<%fieldMachineName%>/g, field.fieldMachineName);
    setFormFields += setFieldTemplate;
  });

  if (!fs.existsSync(`${machineName}/src/Form/${moduleClassPrefix}ConfigForm.php`)) {
    let tpl = configFormTemplate;
    tpl = tpl.replace(/<%moduleMachineName%>/g, machineName);
    tpl = tpl.replace(/<%moduleDisplayName%>/g, displayName);
    tpl = tpl.replace(/<%moduleClassPrefix%>/g, moduleClassPrefix);
    tpl = tpl.replace(/<%formFields%>/g, formFields);
    tpl = tpl.replace(/<%setFormFields%>/g, setFormFields);
    tpl = tpl.replace(/<%moduleUrl%>/g, moduleUrl);
    fs.writeFileSync(`${machineName}/src/Form/${moduleClassPrefix}ConfigForm.php`, tpl);
  }
}