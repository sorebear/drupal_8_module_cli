module.exports = `$form['<%fieldMachineName%>'] = array(
      '#type' => 'select',
      '#title' => $this->t('<%fieldTitle%>'),
      '#options' => [
        'value_1' => 'Label 1',
        'value_2' => 'Label 2',
      ],
      '#default_value' => $this->t('<%fieldMachineName%>') ?: NULL,
    );

    `;