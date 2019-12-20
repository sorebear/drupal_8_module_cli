module.exports = `<%moduleMachineName%>.settings:
  path: '/admin/config/user-interface/<%moduleUrl%>'
  defaults:
    _title: '<%moduleDisplayName%> Settings'
    _form: '\\Drupal\\<%moduleMachineName%>\\Form\\<%moduleClassPrefix%>ConfigForm'
  requirements:
    _permission: 'administer <%moduleMachineName%>'`;