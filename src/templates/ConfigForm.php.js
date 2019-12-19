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

    <%formFields%>
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('<%moduleMachineName%>.settings');
    $values = $form_state->getValues();

    <%setFormFields%>
    $config->save();

    parent::submitForm($form, $form_state);
  }
}`