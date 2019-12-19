module.exports = `$form['<%fieldMachineName%>'] = array(
      '#type' => 'managed_file',
      '#title' => $this->t('<%fieldTitle%>'),
      '#autoupload' => TRUE,
      '#upload_validators' => [
        'file_validate_extensions' => ['csv']
      ],
      '#default_value' => $this->t('<%fieldMachineName%>') ?: NULL,
    );

    `;