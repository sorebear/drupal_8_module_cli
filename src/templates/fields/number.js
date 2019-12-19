module.exports = `$form['<%fieldMachineName%>'] = array(
      '#type' => 'number',
      '#title' => $this->t('<%fieldTitle%>'),
      '#default_value' => $this->t('<%fieldMachineName%>') ?: 0,
    );

    `;