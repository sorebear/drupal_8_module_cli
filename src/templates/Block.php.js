module.exports = `<?php

namespace Drupal\\<%moduleMachineName%>\\Plugin\\Block;

use Drupal\\Core\\Block\\BlockBase;

/**
 * Creates a <%moduleDisplayName%> Block
 *
 * @Block(
 *   id = "<%moduleMachineName%>_block",
 *   admin_label = @Translation("<%moduleDisplayName%> Block"),
 *   category = @Translation("Module"),
 * )
 */
class <%moduleClassPrefix%>Block extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $form = \\Drupal::formBuilder()->getForm('Drupal\\<%moduleMachineName%>\\Form\\<%moduleClassPrefix%>ConfigForm');

    if (isset($form['sample_ckeditor'])) {
      return $form['sample_ckeditor']['#value'];
    } else {
      return [
        '#markup' => 'Sample block output'
      ];
    }
  }
}
`;