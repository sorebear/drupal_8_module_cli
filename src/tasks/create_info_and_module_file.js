const fs = require('fs');

const checkCreateEmptyFile = require('./check_create_empty_file');
const infoTemplate = require('../templates/root_files/info.yml');
const moduleTemplate = require('../templates/root_files/module');
const attachJsVariableTemplate = require('../templates/partials/module/attach_js_variable');

module.exports = (modOptions) => {
  const { displayName, fields = [], includeConfigForm, includeCssJs, machineName, varName } = modOptions;

  if (!fs.existsSync(`${machineName}/${machineName}.info.yml`)) {
    let tpl = infoTemplate;
    tpl = tpl.replace(/<%moduleMachineName%>/g, machineName);
    tpl = tpl.replace(/<%moduleDisplayName%>/g, displayName);
    tpl = tpl.replace(/<%configPath%>/g, includeConfigForm ? `configure: ${machineName}.settings` : '');

    fs.writeFileSync(`${machineName}/${machineName}.info.yml`, tpl);
  }

  if (!fs.existsSync(`${machineName}/${machineName}.module`)) {
    if (includeConfigForm || includeCssJs) {
      let fieldsString = '';
      fields.forEach((field) => {
        if (field.accessibleInJs) {
          let fieldString = attachJsVariableTemplate;
          fieldString = fieldString.replace(/<%fieldMachineName%>/g, field.fieldMachineName);
          fieldString = fieldString.replace(/<%fieldVarName%>/g, field.fieldVarName);
          fieldString = fieldString.replace(/<%moduleVarName%>/g, varName);
          fieldsString += fieldString;
        }
      });
  
      let tpl = moduleTemplate;
      tpl = tpl.replace(/<%attachJsVariables%>/g, fieldsString);
      tpl = tpl.replace(/<%moduleMachineName%>/g, machineName);
      tpl = tpl.replace(/<%getConfig%>/g, includeConfigForm ? `$config = \Drupal::config('${machineName}.settings');` : '');
      tpl = tpl.replace(/<%attachLibrary%>/g, includeCssJs ? `$page['#attached']['library'][] = '${machineName}/assets';` : '');
  
      fs.writeFileSync(`${machineName}/${machineName}.module`, tpl);
    } else {
      checkCreateEmptyFile(`${machineName}/${machineName}.module`);
    }
  }
}