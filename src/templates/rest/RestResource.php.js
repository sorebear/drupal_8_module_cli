module.exports = `<?php

namespace Drupal\\<%moduleMachineName%>\\Plugin\\rest\\resource;

use Drupal\\Core\\Datetime\\DrupalDateTime;
use Drupal\\rest\\Plugin\\ResourceBase;
use Drupal\\rest\\ResourceResponse;

/**
 * Provides an Endpoint for <%moduelDisplayName%>
 * 
 * @RestResource(
 *  id = "<%resourceMachineName%>",
 *  label = @Translation("<%resourceDisplayName%>"),
 *  uri_paths = {
 *    "canonical" = "/<%moduleMachineName%>/<%resourceMachineName%>",
 *    "https://www.drupal.org/link-relations/create" = "/<%moduleMachineName%>/<%resourceMachineName%>"
 *  }
 * )
 */
class <%resourceClassPrefix%>Resource extends ResourceBase {
  <%getFunction%>
  
  <%postFunction%>
}
`