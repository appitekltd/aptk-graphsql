var getUrl = 'https://api.com/graphql?query={me{name}}';

var heroDB = [
  { name: 'A' },
  { name: 'B' }
];

var post = {
  query: 'query',
  operationName: 'name',
  variables: { 'name': 'ell' }
};

var response = {
  data: {},
  errors: []
};
// if no errors remove from response

function handleGetQuery(url) {
  var query = url.spliy('?query=')[1];
  console.log(query);
}

handleGetQuery(getUrl);

var json = { 
  "query": 
  "{" +
  "  Account(first:2 offset:3)" +
  "    Name" +
  "    Amount" +
  "    # Queries can have comments" +
  "    Contact {" +
  "      FirstName" +
  "      LastName" +
  "    }" +
  "    Industry" +
  "  }" +
  "  Lead(first:5)" +
  "    FirstName" +
  "  }" +
  "}"
};

var json = { 
  "query": "{\tAccount(first:2 offset:3)\t\tName\t\tAmount\t\t# Queries can have comments\t\tContact {\t\t\tFirstName\t\t\tLastName\t\t}\t\tIndustry\t}\tLead(first:5)\t\tFirstName\t}}"
};