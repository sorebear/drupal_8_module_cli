module.exports = `$form['<%fieldName%>'] = array(
      '#type' => 'text_format',
      '#title' => $this->t('<%fieldTitle%>'),
      '#format' => 'full_html',
      '#default_value' => $config->get('<%fieldName%>')['value'] ?: $this->t(''),
    );
    `;