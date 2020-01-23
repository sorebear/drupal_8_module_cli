module.exports = `$form['<%fieldMachineName%>'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('<%fieldTitle%>'),
      '#default_value' => $config->get('<%fieldMachineName%>') ?: $this->t(''),
    );

    `;