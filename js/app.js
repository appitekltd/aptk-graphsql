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

function runQuery() {
  var timer = new Date();
  var query = $Editors.query.getValue();
  var vars = JSON.parse($Editors.variables.getValue());
  Visualforce.remoting.Manager.invokeAction(
  $Globals.REMOTE_ACTION,
  query, vars,
  function(result, event) {
    if (result != null) {
      setValues(result, timer);
    }
  }, {escape: false});
}

function testOther() {
  var query = $Editors.query.getValue();
  var vars = JSON.parse($Editors.variables.getValue());
  var data = {
    query: query,
    variables: vars
  };
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        console.log(xhr.response);
      } else {
        console.error(xhr.response);
      }
    }
  }
  console.log(JSON.stringify(data));
  xhr.open('POST', 'https://aptk-graphql-dev-ed.my.salesforce.com/services/apexrest/graphql', true);
  xhr.setRequestHeader('Authorization', 'Bearer ' + $Globals.SESSION_ID);
  xhr.send(JSON.stringify(data));
}

function setValues(result, timer) {
  result = JSON.parse(result);
  result = JSON.stringify(result, null, 2);
  $Editors.results.setValue(result);
  document.getElementById('time').innerText = (new Date() - timer) + 'ms';
}

setDefaults();