module.exports = `$form['<%fieldMachineName%>'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('<%fieldTitle%>'),
      '#default_value' => $this->t('<%fieldMachineName%>') ?: $this->t(''),
    );

    `;