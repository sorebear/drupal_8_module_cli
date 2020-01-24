const fs = require('fs');

const restResourceTemplate = require('../templates/rest/RestResource.php');
const checkCreateDir = require('../tasks/check_create_dir');
const getFunctionsTemplates = require('../templates/rest/get_functions');
const postFunctionsTemplates = require('../templates/rest/post_functions');

module.exports = (app) => {
  const { modOptions } = app;
  const { 
    displayName,
    includeRestResources,
    machineName,
    tableMachineName,
    tableColumns = [],
    restResources = [],
  } = modOptions;

  if (includeRestResources && restResources.length > 0) {
    checkCreateDir(`${machineName}/src`);
    checkCreateDir(`${machineName}/src/Plugin`);
    checkCreateDir(`${machineName}/src/Plugin/rest`);
    checkCreateDir(`${machineName}/src/Plugin/rest/resource`);

    restResources.forEach((restResource) => {
      let tpl = restResourceTemplate;

      const {
        resourceMachineName,
        resourceDisplayName,
        resourceClassPrefix,
        getFunction,
        postFunction,
      } = restResource;
    
      if (getFunction) {
        const getFuncTpl = getFunctionsTemplates[getFunction];
        tpl = tpl.replace(/<%getFunction%>/g, getFuncTpl)
      } else {
        tpl = tpl.replace(/<%getFunction%>/g, '');
      }

      if (postFunction) {
        const postFuncTpl = postFunctionsTemplates[postFunction];
        tpl = tpl.replace(/<%postFunction%>/g, postFuncTpl)
      } else {
        tpl = tpl.replace(/<%postFunction%>/g, '');
      }

      tpl = tpl.replace(/<%moduleDisplayName%>/g, displayName);
      tpl = tpl.replace(/<%moduleMachineName%>/g, machineName);
      tpl = tpl.replace(/<%moduleMachineName%>/g, machineName);
      tpl = tpl.replace(/<%tableMachineName%>/g, tableMachineName);
      tpl = tpl.replace(/<%resourceMachineName%>/g, resourceMachineName);
      tpl = tpl.replace(/<%resourceDisplayName%>/g, resourceDisplayName);
      tpl = tpl.replace(/<%resourceDisplayName%>/g, resourceDisplayName);
      tpl = tpl.replace(/<%resourceClassPrefix%>/g, resourceClassPrefix);

      if (tableColumns.length > 0) {
        tpl = tpl.replace(/<%primaryColumnMachineName%>/g, tableColumns[0].columnMachineName);
      } else {
        tpl = tpl.replace(/<%primaryColumnMachineName%>/g, '');
      }

      fs.writeFileSync(`${machineName}/src/Plugin/rest/resource/${resourceClassPrefix}.php`, tpl);
    });
  }
}