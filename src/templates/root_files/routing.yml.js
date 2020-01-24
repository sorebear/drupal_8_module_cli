module.exports = `<%moduleMachineName%>.settings:
  path: '/admin/config/<%parentUrl%>/<%moduleUrl%>'
  defaults:
    _title: '<%moduleDisplayName%> Settings'
    _form: '\\Drupal\\<%moduleMachineName%>\\Form\\<%moduleClassPrefix%>ConfigForm'
  requirements:
    _permission: 'administer <%moduleMachineName%>'`;