const fs = require('fs');

const installTemplate = require('../templates/root_files/install');
const columnTemplates = require('../templates/schema_columns/index');
const columnIndexTemplate = require('../templates/schema_columns/column_index');
const schemaTemplate = require('../templates/schema_columns/schema_function');

module.exports = (app) => {
  const { modOptions } = app;
  const { machineName, displayName, tableColumns, includeDbTable } = modOptions;

  let tpl = installTemplate;

  if (!includeDbTable) {
    tpl = tpl.replace(/<%schemaFunction%>/g, '');
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

    let schemaTpl = schemaTemplate;
    schemaTpl = schemaTpl.replace(/<%indexes%>/g, indexes);
    schemaTpl = schemaTpl.replace(/<%columns%>/g, columns);
    schemaTpl = schemaTpl.replace(/<%displayName%>/, displayName);
    schemaTpl = schemaTpl.replace(/<%tableMachineName%>/, machineName);
    schemaTpl = schemaTpl.replace(/<%primaryColumnMachineName%>/g, tableColumns[0].columnMachineName);
    tpl = tpl.replace(/<%schemaFunction%>/g, schemaTpl);

    fs.writeFileSync(`${machineName}/${machineName}.install`, tpl);
  }
}