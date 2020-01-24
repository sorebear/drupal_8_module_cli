const fs = require('fs');

const infoTemplate = require('../templates/root_files/info.yml');
const moduleTemplate = require('../templates/module/module');
const viewsDataFunctionTemplate = require('../templates/module/views_data_function');
const viewDataColumnTemplate = require('../templates/module/views_data_column');
const attachJsVariableTemplate = require('../templates/module/attach_js_variable');
const pageAttachAlterFunctionTemplate = require('../templates/module/page_attach_alter_function');

module.exports = (modOptions) => {
  const { 
    displayName,
    fields = [],
    includeBlock,
    includeDbTableInViews,
    includeConfigForm,
    includeCssJs,
    includeRestResources,
    machineName,
    tableColumns,
    tableMachineName,
    tableDisplayName,
    varName
  } = modOptions;

  if (!fs.existsSync(`${machineName}/${machineName}.info.yml`)) {
    let tpl = infoTemplate;
    tpl = tpl.replace(/<%moduleMachineName%>/g, machineName);
    tpl = tpl.replace(/<%moduleDisplayName%>/g, displayName);
    tpl = tpl.replace(/<%configPath%>/g, includeConfigForm ? `configure: ${machineName}.settings` : '');

    if (includeDbTableInViews || includeRestResources || includeBlock) {
      let dependTpl = `dependencies:\n`;

      if (includeBlock) {
        dependTpl += `  - drupal:block\n`;
      }

      if (includeRestResources) {
        dependTpl += `  - drupal:views\n`;
      }

      if (includeRestResources) {
        dependTpl += `  - drupal:rest\n`;
      }

      tpl = tpl.replace(/<%dependencies%>/g, dependTpl);
    } else {
      tpl = tpl.replace(/<%dependencies%>/g, '');
    }

    fs.writeFileSync(`${machineName}/${machineName}.info.yml`, tpl);
  }

  if (!fs.existsSync(`${machineName}/${machineName}.module`)) {
    let tpl = moduleTemplate;

    if (!includeCssJs && !includeCssJs) {
      tpl = tpl.replace(/<%pageAttachAlterFunction%>/g, '');
    } else {
      tpl = tpl.replace(/<%pageAttachAlterFunction%>/g, pageAttachAlterFunctionTemplate);

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
  
      tpl = tpl.replace(/<%attachJsVariables%>/g, fieldsString);
      tpl = tpl.replace(/<%moduleMachineName%>/g, machineName);
      tpl = tpl.replace(/<%getConfig%>/g, includeConfigForm ? `$config = \Drupal::config('${machineName}.settings');` : '');
      tpl = tpl.replace(/<%attachLibrary%>/g, includeCssJs ? `$page['#attached']['library'][] = '${machineName}/assets';` : '');
    }
    
    if (!includeDbTableInViews) {
      tpl = tpl.replace(/<%viewsDataFunction%>/g, '');
    } else {
      tpl = tpl.replace(/<%viewsDataFunction%>/g, viewsDataFunctionTemplate);
      tpl = tpl.replace(/<%tableMachineName%>/g, tableMachineName);
      tpl = tpl.replace(/<%tableDisplayName%>/g, tableDisplayName);
      tpl = tpl.replace(/<%primaryColumnMachineName%>/g, tableColumns[0].columnMachineName);
      tpl = tpl.replace(/<%primaryColumnTitle%>/g, tableColumns[0].columnTitle);
      tpl = tpl.replace(/<%moduleMachineName%>/g, machineName);
      tpl = tpl.replace(/<%moduleDisplayName%>/g, displayName);

      let viewDataColumns = '';

      for (let i = 1; i < tableColumns.length; i += 1) {
        let columnTpl = viewDataColumnTemplate;
  
        columnTpl = columnTpl.replace(/<%tableMachineName%>/g, tableMachineName);
        columnTpl = columnTpl.replace(/<%columnMachineName%>/g, tableColumns[i].columnMachineName);
        columnTpl = columnTpl.replace(/<%columnTitle%>/g, tableColumns[i].columnTitle);
  
        viewDataColumns += columnTpl;
      }

      tpl = tpl.replace(/<%viewsDataColumns%>/g, viewDataColumns);
    }

    fs.writeFileSync(`${machineName}/${machineName}.module`, tpl);
  }
}