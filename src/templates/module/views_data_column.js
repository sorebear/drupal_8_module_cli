module.exports = `
  $data['<%tableMachineName%>']['<%columnMachineName%>'] = array(
    'title' => t('<%columnTitle%>'),
    'help' => t('<%columnTitle%>'),
    'field' => array(
      'id' => 'standard',
    ),
    'sort' => array(
      'id' => 'standard',
    ),
    'filter' => array(
      'id' => 'string',
    ),
    'argument' => array(
      'id' => 'string'
    ),
  );
`