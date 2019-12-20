const fs = require('fs');
const checkCreateDir = require('./check_create_dir');
const blockTemplate = require('../templates/Block.php');

module.exports = (modOptions) => {
  const { classPrefix, displayName, machineName, url } = modOptions;

  checkCreateDir(`${machineName}/src`);
  checkCreateDir(`${machineName}/src/Plugin`);
  checkCreateDir(`${machineName}/src/Plugin/Block`);

  if (!fs.existsSync(`${machineName}/src/Plugin/${classPrefix}Block.php`)) {
    let tpl = blockTemplate;
    tpl = tpl.replace(/<%moduleMachineName%>/g, machineName);
    tpl = tpl.replace(/<%moduleDisplayName%>/g, displayName);
    tpl = tpl.replace(/<%moduleClassPrefix%>/g, classPrefix);
    tpl = tpl.replace(/<%moduleUrl%>/g, url);
    fs.writeFileSync(`${machineName}/src/Plugin/Block/${classPrefix}Block.php`, tpl);
  }
}