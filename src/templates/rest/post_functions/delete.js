module.exports = `/**
  * Responds to POST requests
  * @return \\Drupal\\rest\\ResourceResponse
  */
  public function post($data) {
    $database = \\Drupal::database();

    $<%primaryColumnMachineName%> = $data['<%primaryColumnMachineName%>'];

    $num_of_deletions = $database->delete('<%tableMachineName%>')
      ->condition('<%primaryColumnMachineName%>', $<%primaryColumnMachineName%>)
      ->execute();

    if ($num_of_deletions && $num_of_deletions > 0) {
      return new ResourceResponse(array(
        'message' => 'Row was deleted from the database.',
        'num_of_deletions' => $num_of_deletions,
      ));
    } else {
      return new ResourceResponse(array(
        'message' => 'There was an error deleting the row.',
      ));
    }
  }`;