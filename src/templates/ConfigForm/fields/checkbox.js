module.exports = `$form['<%fieldMachineName%>'] = array(
      '#type' => 'checkbox',
      '#title' => $this->t('<%fieldTitle%>'),
      '#default_value' => $config->get('<%fieldMachineName%>') ?: FALSE,
    );

    `;