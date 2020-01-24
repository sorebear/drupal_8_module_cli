const addRow = require('./add');
const deleteRow = require('./delete');
const updateRow = require('./update');

module.exports = {
  'POST add($data)': addRow,
  'POST delete($data)': deleteRow,
  'POST update($data)': updateRow,
};