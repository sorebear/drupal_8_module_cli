const fs = require('fs');

module.exports = (fileName) => {
  if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, '');
  }
}