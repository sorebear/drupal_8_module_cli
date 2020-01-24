module.exports = `/**
 * Implements MODULE_views_data()
 */
function <%moduleMachineName%>_views_data() {
  $data = array();
  $data['<%tableMachineName%>']['table'] = array();
  $data['<%tableMachineName%>']['table']['group'] = t('<%tableDisplayName%>');
  $data['<%tableMachineName%>']['table']['provider'] = '<%moduleMachineName%>';

  $data['<%tableMachineName%>']['table']['base'] = array(
    'field' => '<%primaryColumnMachineName%>',
    'title' => t('<%tableDisplayName%>'),
    'help' => t('Custom table "<%tableDisplayName%>" from the <%moduleDisplayName%> module'),
    'weight' => -10,
  );

  <%viewsDataColumns%>

  return $data;
}
`
