module.exports = `<?php

function <%moduleMachineName%>_page_attachments_alter(array &$page) {
  <%getConfig%>
  <%attachJsVariables%>
  <%attachLibrary%>
}`