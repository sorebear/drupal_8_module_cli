const fs = require('fs');

const checkCreateDir = require('./check_create_dir');
const checkCreateEmptyFile = require('./check_create_empty_file');
const checkCreateRootFile = require('./check_create_root_file');
const jsFileTemplate = require('../templates/js/js');
const jsVariableTemplate = require('../templates/js/js_variable');

module.exports = function(modOptions) {
  const { classPrefix, fields = [], machineName, varName } = modOptions;
  checkCreateRootFile(modOptions, 'libraries.yml');
  checkCreateDir(`${machineName}/css`);
  checkCreateEmptyFile(`${machineName}/css/${machineName}.css`);
  checkCreateDir(`${machineName}/js`);

  if (!fs.existsSync(`${machineName}/js/${machineName}.js`)) {
    let fieldsString = '';
    fields.forEach((field) => {
      if (field.accessibleInJs) {
        let fieldString = jsVariableTemplate;
        fieldString = fieldString.replace(/<%fieldVarName%>/g, field.fieldVarName);
        fieldString = fieldString.replace(/<%moduleVarName%>/g, varName);
        fieldsString += fieldString;
      }
    });

    let tpl = jsFileTemplate;
    tpl = tpl.replace(/<%jsVariables%>/, fieldsString);
    tpl = tpl.replace(/<%moduleClassName%>/g, classPrefix);
    tpl = tpl.replace(/<%moduleVarName%>/g, varName);
    fs.writeFileSync(`${machineName}/js/${machineName}.js`, tpl);
  }
}