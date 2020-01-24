const fs = require('fs');

const checkCreateDir = require('../tasks/check_create_dir');
const installTemplate = require('../templates/install/install');
const columnTemplates = require('../templates/install/schema_columns/index');
const columnIndexTemplate = require('../templates/install/column_index');
const schemaTemplate = require('../templates/install/schema_function');

module.exports = (app) => {
  const { modOptions } = app;
  const { 
    machineName, 
    displayName,
    tableMachineName,
    tableColumns,
    includeDbTable
  } = modOptions;

  let installTpl = installTemplate;

  if (!includeDbTable) {
    installTpl = installTpl.replace(/<%schemaFunction%>/g, '');
  } else {
    let columns = '';
    let indexes = '';

    tableColumns.forEach((column) => {
      let columnTpl = columnTemplates[column.columnType];
      columnTpl = columnTpl.replace(/<%columnMachineName%>/g, column.columnMachineName);
      columnTpl = columnTpl.replace(/<%columnTitle%>/g, column.columnTitle);

      let indexTpl = columnIndexTemplate;
      indexTpl = indexTpl.replace(/<%columnMachineName%>/g, column.columnMachineName);

      columns += columnTpl;
      indexes += indexTpl;
    });

    installTpl = installTpl.replace(/<%schemaFunction%>/g, schemaTemplate);
    installTpl = installTpl.replace(/<%moduleMachineName%>/g, machineName)
    installTpl = installTpl.replace(/<%indexes%>/g, indexes);
    installTpl = installTpl.replace(/<%columns%>/g, columns);
    installTpl = installTpl.replace(/<%displayName%>/, displayName);
    installTpl = installTpl.replace(/<%tableMachineName%>/, tableMachineName);
    installTpl = installTpl.replace(/<%primaryColumnMachineName%>/g, tableColumns[0].columnMachineName);

    fs.writeFileSync(`${machineName}/${machineName}.install`, installTpl);
    checkCreateDir(`${machineName}/config`);
    checkCreateDir(`${machineName}/config/install`);
  }
}