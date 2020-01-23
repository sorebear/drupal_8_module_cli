module.exports = `$form['<%fieldMachineName%>'] = array(
      '#type' => 'number',
      '#title' => $this->t('<%fieldTitle%>'),
      '#default_value' => $config->get('<%fieldMachineName%>') ?: 0,
    );

    `;