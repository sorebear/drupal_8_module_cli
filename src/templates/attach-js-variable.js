module.exports = `
  $page['#attached']['drupalSettings']['<%moduleVarName%>']['<%fieldVarName%>'] = $config->get('<%fieldMachineName%>');`;