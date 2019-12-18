const checkCreateRootFile = require('./check_create_root_file');

module.exports = (machineName, displayName) => {
  checkCreateRootFile(machineName, displayName, 'info.yml');
  checkCreateRootFile(machineName, displayName, 'module');
}