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

var $Examples = {
  '1': {
    query: 
    'query {\n' + 
    '  Account(Limit: 10) {\n' + 
    '    Id\n' + 
    '    Name\n' + 
    '    Industry\n' + 
    '  }\n' +
    '}',
    variables: 
    '{}'
  },
  '2': {
    query: 
    'query {\n' + 
    '  Account(Industry: $industry) {\n' + 
    '    Id\n' + 
    '    Name\n' + 
    '    Industry\n' + 
    '  }\n' +
    '}',
    variables: 
    '{\n' + 
    '  "industry": "Manufacturing"\n' + 
    '}'
  },
  '3': {
    query: 
    'query {\n' + 
    '  MyName: Account(Limit: 10) {\n' + 
    '    Id\n' + 
    '    Name\n' + 
    '    Contact(Limit: $contactLimit) {\n' + 
    '      FirstName\n' + 
    '      LastName\n' + 
    '    }\n' + 
    '    Industry\n' + 
    '  }\n' + 
    '  Lead(Limit: 5) {\n' + 
    '    FirstName\n' + 
    '  }\n' + 
    '}',
    variables: 
    '{\n' + 
    '  "contactLimit": "2"\n' + 
    '}'
  },
  '4': {
    query:
    'mutation {\n' + 
    '  Account(Name: ABC Ltd.) {\n' + 
    '    Id\n' + 
    '    Name\n' + 
    '  }\n' + 
    '}',
    variables: 
    '{}'
  },
  '5': {
    query:
    'mutation {\n' + 
    '  Account(Name: ABC Ltd.) {\n' + 
    '    Id\n' + 
    '    Name\n' + 
    '    Contact(LastName: Smith, FirstName: Jon) {\n' + 
    '      Id\n' + 
    '      Task(subject: $subject) {\n' +
    '        Id\n' +
    '      }\n' +
    '    }\n' + 
    '  }\n' + 
    '}',
    variables: 
    '{\n' + 
    '  "subject": "New Call"\n' + 
    '}'

  }
}

// set the default example query
function setDefaults() {
  var type = document.getElementById('examples').value;
  $Editors.query.setValue($Examples[type].query);
  $Editors.variables.setValue($Examples[type].variables);
  $Editors.results.setValue('');
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
  var statName = query.indexOf('mutation') == 0 ? 'aptk_graphql__count_mutations_pg' : 'aptk_graphql__count_queries_pg';
  Visualforce.remoting.Manager.invokeAction(
  $Globals.STAT_ACTION, statName,
  function(result, event) {
    console.log('S', result, event);
  }, {escape: false});
}

// set initial example query
setDefaults();