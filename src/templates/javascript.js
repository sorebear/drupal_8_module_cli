module.exports = `function <%moduleClassName%>() {
<%jsVariables%>
  this.init = function() {

  }
}

document.addEventListener('DOMContentLoaded', function() {
  var <%moduleVarName%> = new <%moduleClassName%>();
  <%moduleVarName%>.init();
});
`;