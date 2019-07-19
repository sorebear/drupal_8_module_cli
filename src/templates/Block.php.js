module.exports = `<?php

namespace Drupal\\custom_css\\Plugin\\Block;

use Drupal\\Core\\Block\\BlockBase;

/**
 * Creates a <%moduleDisplayName%> Block
 *
 * @Block(
 *   id = "<%moduleMachineName%>_block",
 *   admin_label = @Translation("<%moduleDisplayName%>"),
 *   category = @Translation("Module"),
 * )
 */
class <%moduleClassPrefix%>Block extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $form = \\Drupal::formBuilder()->getForm('Drupal\\<%moduleMachineName%>\\Form\\<%moduleClassPrefix%>ConfigForm');

    if (isset($form['sample_wysiwyg'])) {
      return $form['sample_wysiwyg']['#value'];
    } else {
      return [
        '#markup' => 'Sample block output'
      ];
    }
  }
}
`;