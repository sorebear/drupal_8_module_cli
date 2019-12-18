module.exports = `$form['<%fieldName%>'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('<%fieldTitle%>'),
      '#default_value' => $this->t('<%fieldName%>') ?: $this->t(''),
    );

    `;