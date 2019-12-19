module.exports = `$form['<%fieldMachineName%>'] = array(
      '#type' => 'text_format',
      '#title' => $this->t('<%fieldTitle%>'),
      '#format' => 'full_html',
      '#default_value' => $config->get('<%fieldMachineName%>')['value'] ?: $this->t(''),
    );
    
    `;