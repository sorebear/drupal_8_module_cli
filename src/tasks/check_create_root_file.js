const fs = require('fs');
const templates = require('../templates/root_files');

module.exports = function(modOptions, extension) {
  const { classPrefix, machineName, displayName, url } = modOptions;

  let tpl = templates[extension];
  tpl = tpl.replace(/<%moduleMachineName%>/g, machineName);
  tpl = tpl.replace(/<%moduleDisplayName%>/g, displayName);
  tpl = tpl.replace(/<%moduleClassPrefix%>/g, classPrefix);
  tpl = tpl.replace(/<%moduleUrl%>/g, url);

  if (!fs.existsSync(`${machineName}/${machineName}.${extension}`)) {
    fs.writeFileSync(`${machineName}/${machineName}.${extension}`, tpl);
  }
}