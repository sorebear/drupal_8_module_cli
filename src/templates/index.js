const info = require('./info.yml.js');
const libraries = require('./libraries.yml.js');
const links = require('./links.menu.yml.js');
const moduleFile = require('./module.js');
const permissions = require('./permissions.yml.js');
const routing = require('./routing.yml.js');

module.exports = {
  'info.yml': info,
  'libraries.yml': libraries,
  'links.menu.yml': links,
  'module': moduleFile,
  'permissions.yml': permissions,
  'routing.yml': routing,
};
