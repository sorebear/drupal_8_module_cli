const addRow = require('./add');
const deleteRow = require('./delete');
const updateRow = require('./update');

module.exports = {
  '1': addRow,
  '2': deleteRow,
  '3': updateRow,
};