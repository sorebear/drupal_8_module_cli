module.exports = `/**
* Implements hook_schema()
* 
* Defines the database tables used by this module
*/
function <%moduleMachineName%>_schema() {
  $schema['<%tableMachineName%>'] = array(
    'description' => 'Custom Table for the <%displayName%> Module',
    'fields' => array(
      <%columns%>
    ),
    'primary key' => array('<%primaryColumnMachineName%>'),
    'indexes' => array(
      <%indexes%>
    ),
  );

  return $schema;
}`