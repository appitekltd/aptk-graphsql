// store all the code mirrors in one place
var $Editors = {
  query: CodeMirror.fromTextArea(document.getElementById('query'), {
    lineNumbers: true
  }),
  variables: CodeMirror.fromTextArea(document.getElementById('variables'), {
    lineNumbers: true
  }),
  results: CodeMirror.fromTextArea(document.getElementById('result'), {
    lineNumbers: true,
    readOnly: true
  })
};

// set the default example query
function setDefaults() {
  $Editors.query.setValue(
    '{\n' + 
    '  MyName: Account(limit:10) {\n' + 
    '    Id\n' + 
    '    Name\n' + 
    '    Contact(limit:2) {\n' + 
    '      FirstName\n' + 
    '      LastName\n' + 
    '    }\n' + 
    '    Industry\n' + 
    '  }\n' + 
    '  Lead(limit:5) {\n' + 
    '    FirstName\n' + 
    '  }\n' + 
    '}'
  );
  $Editors.variables.setValue(
    '{\n' + 
    '  "variableName": "variableValue"\n' + 
    '}'
  );
  runQuery();
}

// run a query by sending it to our GraphQL.runQuery() method
function runQuery() {
  var timer = new Date();
  var query = $Editors.query.getValue();
  var vars = JSON.parse($Editors.variables.getValue());
  Visualforce.remoting.Manager.invokeAction(
  $Globals.REMOTE_ACTION,
  query, vars,
  function(result, event) {
    if (result != null) {
      result = JSON.parse(result);
      result = JSON.stringify(result, null, 2);
      $Editors.results.setValue(result);
      document.getElementById('time').innerText = (new Date() - timer) + 'ms';
    }
  }, {escape: false});
}

// set initial example query
setDefaults();