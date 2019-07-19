const fs = require('fs');
const templates = require('../templates');

module.exports = function(moduleMachineName, moduleDisplayName, extension) {
  const moduleClassPrefix = moduleDisplayName.split(' ').join('');
  const moduleUrl = moduleMachineName.split('_').join('-');

  let tpl = templates[extension];
  tpl = tpl.replace(/<%moduleMachineName%>/g, moduleMachineName);
  tpl = tpl.replace(/<%moduleDisplayName%>/g, moduleDisplayName);
  tpl = tpl.replace(/<%moduleClassPrefix%>/g, moduleClassPrefix);
  tpl = tpl.replace(/<%moduleUrl%>/g, moduleUrl);

  if (!fs.existsSync(`${moduleMachineName}/${moduleMachineName}.${extension}`)) {
    fs.writeFileSync(`${moduleMachineName}/${moduleMachineName}.${extension}`, tpl);
  }
}