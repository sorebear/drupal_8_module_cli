const checkCreateDir = require('./check_create_dir');
const checkCreateEmptyFile = require('./check_create_empty_file');
const checkCreateRootFile = require('./check_create_root_file');

module.exports = function(machineName, displayName) {
  checkCreateRootFile(machineName, displayName, 'libraries.yml');
  checkCreateDir(`${machineName}/css`);
  checkCreateEmptyFile(`${machineName}/css/${machineName}.css`);
  checkCreateDir(`${machineName}/js`);
  checkCreateEmptyFile(`${machineName}/js/${machineName}.js`);
}