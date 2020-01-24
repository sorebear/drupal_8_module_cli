module.exports = `/**
   * Responds to POST requests
   * @return \\Drupal\\rest\\ResourceResponse
   */
  public function post($data) {
    $database = \\Drupal::database();
    
    $fields = array();

    foreach ($data as $key => $value) {
      $fields[$key] = $value;
    }

    $result = $database->insert('<%tableMachineName%>')
      ->fields($fields)
      ->execute();

    if ($result) {
      return new ResourceResponse(
        array(
          'message' => 'Row successfully inserted into database.',
          'id' => $result,
        )
      );
    } else {
      return new ResourceResponse(
        array(
          'message' => 'There was an error inserting the row into the database.',
        )
      );
    }
  }
`