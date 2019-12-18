module.exports = `$form['<%fieldName%>'] = array(
      '#type' => 'checkbox',
      '#title' => $this->t('<%fieldTitle%>'),
      '#default_value' => $this->t('<%fieldName%>') ?: FALSE,
    );

    `;