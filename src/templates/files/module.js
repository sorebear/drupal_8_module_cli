module.exports = `<?php

function <%moduleMachineName%>_page_attachments_alter(array &$page) {
  $config = \Drupal::config('<%moduleMachineName%>.settings');
  <%attachJsVariables%>
  <%attachLibrary%>
}`