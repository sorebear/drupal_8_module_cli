module.exports = `/**
 * Implements MODULE_page_attachments_alter()
 */
function <%moduleMachineName%>_page_attachments_alter(array &$page) {
  <%getConfig%>
  <%attachJsVariables%>
  <%attachLibrary%>
}
`;