const fs = require('fs');
const checkCreateDir = require('./check_create_dir');
const blockTemplate = require('../templates/Block.php');

module.exports = (machineName, displayName) => {
  const moduleClassPrefix = displayName.split(' ').join('');
  const moduleUrl = machineName.split('_').join('-') ;

  checkCreateDir(`${machineName}/src`);
  checkCreateDir(`${machineName}/src/Plugin`);

  if (!fs.existsSync(`${machineName}/src/Plugin/${moduleClassPrefix}Block.php`)) {
    let tpl = blockTemplate;
    tpl = tpl.replace(/<%moduleMachineName%>/g, machineName);
    tpl = tpl.replace(/<%moduleDisplayName%>/g, displayName);
    tpl = tpl.replace(/<%moduleClassPrefix%>/g, moduleClassPrefix);
    tpl = tpl.replace(/<%moduleUrl%>/g, moduleUrl);
    fs.writeFileSync(`${machineName}/src/Plugin/${moduleClassPrefix}Block.php`, tpl);
  }
}