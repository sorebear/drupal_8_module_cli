const allRows = require('./all');
const singleRow = require('./single');

module.exports = {
  'GET all': allRows,
  'GET single($id)': singleRow,
};