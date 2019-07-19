module.exports = `<?php

namespace Drupal\\<%moduleMachineName%>\\Form;

use Drupal\\Core\\Form\\ConfigFormBase;
use Drupal\\Core\\Form\\FormStateInterface;

class <%moduleClassPrefix%>ConfigForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return '<%moduleMachineName%>_config_form';
  }

  /**
   * {@inheritdoc}
   */
  public function getEditableConfigNames() {
    return ['<%moduleMachineName%>.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('<%moduleMachineName%>.settings');

    $form['sample_textfield'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Sample Textfield'),
      '#description' => $this->t('Enter Description Here'),
      '#default_value' => $config->get('sample_textfield') ?: $this->t(''),
    ];

    $form['sample_wysiwyg'] = [
      '#type'  => 'text_format',
      '#title' => $this->t('Sample Wysiwyg'),
      '#format' => 'full_html',
      '#default_value' => $config->get('sample_wysiwyg')['value'] ?: $this->t(''),
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('<%moduleMachineName%>.settings');
    $values = $form_state->getValues();

    $config->set('sample_textfield', $values['sample_textfield']);
    $config->set('sample_wysiwyg', $values['sample_wysiwyg']);
    $config->save();

    parent::submitForm($form, $form_state);
  }
}`