var documentation = {
  'GraphSQL': {
    menu: [
      { name: 'Introduction', links: ['Getting Started']},
      { name: 'Supported Features', links: ['Queries', 'Arguments', 'Aliases', 'Variables', 'Mutations']},
      { name: 'GraphSQL Playground', links: []},
      { name: 'GraphSQL Endpoint', links: []},
      { name: 'Known Issues', links: []},
      { name: 'Planned Features', links: []},
    ],
    pages: {
      'Introduction': [
        { type: 'Text', text: 'GraphSQL is an extension for Salesforce that allows you to send [https://graphql.org/learn/queries/]GraphQL[] queries to the Salesforce API. This allows you to benefit from a lot of the cool features that GraphQL has, as well as letting you query multiple objects and relationships with the same API call, meaning you can make your integrations much more efficient and cost effective. Using Mutations you can create or update multiple records in one go, meaning an entire family of records can be inserted with just one API call.'},
        { type: 'Image', text: 'Add in GraphQL to your integrations to make them more efficient', image: '../screenshots/overview.PNG'},
        { type: 'Subtitle', text: 'GraphSQL Playground'},
        { type: 'Text', text: 'With the GraphSQL Playground, you can test out GraphQL queries and get back not only the GraphQL JSON response you\'d expect, but also a list of the queries or mutations that were run to get the data, so you can check that your arguments are being passed in correctly, and see how things are being run under the hood.'},
        { type: 'Subtitle', text: 'GraphSQL Endpoint'},
        { type: 'Text', text: 'The main feature of GraphSQL is a new API endpoint that is added to your Salesforce instance. This custom REST API endpoint can be found at ``https://instance.salesforce.com/services/apexrest/aptk_graphql/graphql`. This is the same endpoint that is used by the playground, so if it\'s working there you\'ll know it\'ll work in your code.'},
        { type: 'Warning', text: 'If you\'re making requests to this endpoint, make sure you\'ve whitelisted your requesting domains in Setup -> CORS'},
        { type: 'Text', text: 'If you\'re ready, let\'s get stuck in!'},
        { type: 'Navigation', next: 'Getting Started', doc: 'GraphSQL'}
      ],
      'Getting Started': [
        { type: 'Text', text: 'GraphSQL assumes you have a basic understanding of GraphQL queries. Before using GraphSQL you should go through the [https://graphql.org/learn/queries/]GraphQL learning resources[] as they will help you understand how to structure your queries. As you learn bear in mind not all features are supported by GraphSQL, so please be sure to check the supported features below.'},
        { type: 'Navigation', back: 'Introduction', next: 'Supported Features', doc: 'GraphSQL'}
      ],
      'Supported Features': [
        { type: 'Text', text: 'Not all features of GraphQL are supported, so be sure to check the list below for what you are trying to achieve. Some things like Fragments are currently part of our Planned Features list.'},
        { type: 'Text', text: 'The features that are supported in GraphSQL are:'},
        { type: 'List', items: ['Queries', 'Arguments', 'Aliases', 'Variables', 'Mutations']},
        { type: 'Text', text: 'Let\'s start with the basics and go through writing Queries. For each of these features we recommend getting up the GraphSQL Playground so you can write the queries along with us.'},
        { type: 'Navigation', back: 'Getting Started', next: 'Queries', doc: 'GraphSQL'}
      ],
      'Queries': [
        { type: 'Text', text: 'All basic queries are supported by GraphSQL. When running your queries you need to use the exact API names of your objects, and of your fields. If you use the wrong object name you\'ll get an error that it\'s not a valid sObject. If you use a wrong field name it\'ll be ignored from the query. You can specify that you are running a query vs a mutation by starting your GraphQL with "query".'},
        { type: 'Code', 
          left: 
          'query {\n' +
          '  Account {\n' +
          '    Name\n' +
          '    Custom_Field__c\n' +
          '  }\n' +
          '}\n',
          right:
          '{\n' +
          '  "queries": [\n' +
          '    "SELECT Name FROM Account"\n' +
          '  ],\n' +
          '  "mutations": null,\n' +
          '  "errors": [],\n' +
          '  "data": {\n' +
          '    "Account": [\n' +
          '      {\n' +
          '        "Name": "Edge Communications"\n' +
          '        "Custom_Field__c": "Value"\n' +
          '      },\n' +
          '      ...\n' +
          '    ]\n' +
          '  }\n' +
          '}\n',  
        },
        { type: 'Text', text: 'When you nest your queries GraphSQL will automatically get the children each time, meaning you are only limited by govenor limits, rather than the 1 child limit of standard SQL queries.'},
        { type: 'Code',
          left: 
          'query {\n' +
          '  Account {\n' +
          '    Name\n' +
          '    Contact {\n' +
          '      Name\n' +
          '    }\n' +
          '  }\n' +
          '}\n',
          right:
          '{\n' +
          '  "queries": [\n' +
          '    "SELECT Name FROM Account",\n' +
          '    "SELECT Name, AccountId FROM Contact WHERE AccountId IN (\'0014J000004iKCNQA2\', ...) "\n' +
          '  ],\n' +
          '  "mutations": null,\n' +
          '  "errors": [],\n' +
          '  "data": {\n' +
          '    "Account": [\n' +
          '      {\n' +
          '        "Contact": [\n' +
          '          {\n' +
          '            "Name": "Rose Gonzalez"\n' +
          '          },\n' +
          '          {\n' +
          '            "Name": "Sean Forbes"\n' +
          '          }\n' +
          '        ],\n' +
          '        "Name": "Edge Communications"\n' +
          '      },\n' +
          '      ...\n' +
          '    ]\n' +
          '  }\n' +
          '}\n'
        },
        { type: 'Text', text: 'If you have two different lookups on the same child object to a parent you can specify the child you want to use by adding the relationship field name to the query like so:'},
        { type: 'Code',
          left: 
          'query {\n' +
          '  Account {\n' +
          '    Name\n' +
          '    Contact[AccountId] {\n' +
          '      Name\n' +
          '    }\n' +
          '  }\n' +
          '}\n',
          right:
          '{\n' +
          '  "queries": [\n' +
          '    "SELECT Name FROM Account",\n' +
          '    "SELECT Name, AccountId FROM Contact WHERE AccountId IN (\'0014J000004iKCNQA2\', ...) "\n' +
          '  ],\n' +
          '  "mutations": null,\n' +
          '  "errors": [],\n' +
          '  "data": {\n' +
          '    "Account": [\n' +
          '      {\n' +
          '        "Contact[AccountId]": [\n' +
          '          {\n' +
          '            "Name": "Rose Gonzalez"\n' +
          '          },\n' +
          '          {\n' +
          '            "Name": "Sean Forbes"\n' +
          '          }\n' +
          '        ],\n' +
          '        "Name": "Edge Communications"\n' +
          '      },\n' +
          '      ...\n' +
          '    ]\n' +
          '  }\n' +
          '}\n'
        },
        { type: 'Text', text: 'You can also use dot notation to access related data via lookup fields.'},
        { type: 'Code',
          left: 
          'query {\n' +
          '  Contact {\n' +
          '    Id\n' +
          '    Name\n' +
          '    Account.CreatedBy.Name\n' +
          '  }\n' +
          '}\n',
          right:
          '{\n' +
          '  "queries": [\n' +
          '    "SELECT Id, Name, Account.CreatedBy.Name FROM Contact"\n' +
          '  ],\n' +
          '  "mutations": null,\n' +
          '  "errors": [],\n' +
          '  "data": {\n' +
          '    "Contact": [\n' +
          '      {\n' +
          '        "Account.CreatedBy.Name": "John Smith",\n' +
          '        "Name": "John Smith",\n' +
          '        "Id": "0034J000009skWaQAI"\n' +
          '      },\n' +
          '      ...\n' +
          '    ]\n' +
          '  }\n' +
          '}\n'
        },
        { type: 'Text', text: 'Now let\'s have a look at Arguments.'},
        { type: 'Navigation', back: 'Supported Features', next: 'Arguments', doc: 'GraphSQL'}
      ],
      'Arguments': [
        { type: 'Text', text: 'Arguments allow you to specify certain filters to your queries. In GraphSQL you can use "offset", "limit", and as well as any field for that object.'},
        { type: 'Text', text: 'You can also specify "orderBy" and "orderDir", where "orderBy" is any field, and "orderDir" is either "ASC" or "DESC".'},
        { type: 'Code',
          left:
          'query {\n' +
          '  Account(limit:2, orderBy: Name) {\n' +
          '    Name\n' +
          '  },\n' +
          '  Lead(Id:00Q4J000001lSwhUAE) {\n' +
          '    Id\n' +
          '  }\n' +
          '}\n',
          right:
          '{\n' +
          '  "queries": [\n' +
          '    "SELECT Name FROM Account ORDER BY Name ASC LIMIT 2",\n' +
          '    "SELECT Id FROM Lead WHERE Id = \'00Q4J000001lSwhUAE\'"\n' +
          '  ],\n' +
          '  "mutations": null,\n' +
          '  "errors": [],\n' +
          '  "data": {\n' +
          '    "Lead": [\n' +
          '      {\n' +
          '        "Id": "00Q4J000001lSwhUAE"\n' +
          '      }\n' +
          '    ],\n' +
          '    "Account": [\n' +
          '      {\n' +
          '        "Name": "Burlington Textiles Corp of America"\n' +
          '      },\n' +
          '      {\n' +
          '        "Name": "Edge Communications"\n' +
          '      }\n' +
          '    ]\n' +
          '  }\n' +
          '}\n'
        },
        { type: 'Text', text: 'Now let\'s have a look at Aliases.'},
        { type: 'Navigation', back: 'Queries', next: 'Aliases', doc: 'GraphSQL'}
      ],
      'Aliases': [
        { type: 'Text', text: 'Aliases allow you to rename an object by giving it a nickname. This doesn\'t affect your query but will change the name of that object in your returned JSON.'},
        { type: 'Code', 
          left:
          'query {\n' +
          '  MyNickname: Account(limit:1) {\n' +
          '    Name\n' +
          '  }\n' +
          '}\n',
          right:
          '{\n' +
          '  "queries": [\n' +
          '    "SELECT Name FROM Account LIMIT 1"\n' +
          '  ],\n' +
          '  "mutations": null,\n' +
          '  "errors": [],\n' +
          '  "data": {\n' +
          '    "MyNickname": [\n' +
          '      {\n' +
          '        "Name": "Edge Communications"\n' +
          '      }\n' +
          '    ]\n' +
          '  }\n' +
          '}\n'
        },
        { type: 'Text', text: 'Now let\'s have a look at Variables.'},
        { type: 'Navigation', back: 'Arguments', next: 'Variables', doc: 'GraphSQL'}
      ],
      'Variables': [
        { type: 'Text', text: 'Variables allow you to re-use a query but send in variables that are dynamically added to your query. To add variables you specify them in your query as ``$varName`, and then add in the value to your variables input.'},
        { type: 'Code',
          left:
          'query {\n' +
          '  Account(name:$myName) {\n' +
          '    Id\n' +
          '    Name\n' +
          '  }\n' +
          '}\n' +
          '\n' +
          '# Variables\n' +
          '{\n' +
          '  "myName": "\'Edge Communications\'"\n' +
          '}\n',
          right:
          '{\n' +
          '  "queries": [\n' +
          '    "SELECT Id, Name FROM Account WHERE Name = \'Edge Communications\'"\n' +
          '  ],\n' +
          '  "mutations": null,\n' +
          '  "errors": [],\n' +
          '  "data": {\n' +
          '    "Account": [\n' +
          '      {\n' +
          '        "Id": "0014J000004iKCNQA2"\n' +
          '        "Name": "Edge Communications"\n' +
          '      }\n' +
          '    ]\n' +
          '  }\n' +
          '}\n'
        },
        { type: 'Subtitle', text: 'Complex Example'},
        { type: 'Text', text: 'When you put all these together you can create some pretty complex queries that although are running multiple SQL queries behind the scenes, only use up one REST API call. Here\'s an example of a 4 level deep query, something you\'d never be able to achieve with standard SQL queries.'},
        { type: 'Code',
          left:
          'query {\n' +
          '  Company: Account(Industry:$type limit:1) {\n' +
          '    Id\n' +
          '    Contact(limit:1) {\n' +
          '      Name\n' +
          '      Tasks: Task {\n' +
          '        Subject\n' +
          '        Status\n' +
          '        ContentDocumentLink {\n' +
          '          Id\n' +
          '          Title\n' +
          '          ContentDocumentId\n' +
          '        }\n' +
          '      }\n' +
          '    }\n' +
          '  }\n' +
          '}\n',
          right:
          '{\n'+
          '  "queries": [\n'+
          '    "SELECT Id FROM Account LIMIT 1",\n'+
          '    "SELECT Name, AccountId FROM Contact WHERE AccountId IN (\'0014J000004iKCNQA2\')  LIMIT 1",\n'+
          '    "SELECT Subject, Status, WhoId FROM Task WHERE WhoId IN (\'0034J000004mj4dQAA\') ",\n'+
          '    "SELECT Id, ContentDocumentId, LinkedEntityId FROM ContentDocumentLink WHERE LinkedEntityId IN (\'00T4J0000040D6TUAU\') "\n'+
          '  ],\n'+
          '  "mutations": null,\n' +
          '  "errors": [],\n'+
          '  "data": {\n'+
          '    "Company": [\n'+
          '      {\n'+
          '        "Contact": [\n'+
          '          {\n'+
          '            "Tasks": [\n'+
          '              {\n'+
          '                "ContentDocumentLink": [\n'+
          '                  {\n'+
          '                    "ContentDocumentId": "0694J0000009NToQAM",\n'+
          '                    "Id": "06A4J000000h6DNUAY"\n'+
          '                  }\n'+
          '                ],\n'+
          '                "Status": "Not Started",\n'+
          '                "Subject": "Test Task"\n'+
          '              }\n'+
          '            ],\n'+
          '            "Name": "Rose Gonzalez"\n'+
          '          }\n'+
          '        ],\n'+
          '        "Id": "0014J000004iKCNQA2"\n'+
          '      }\n'+
          '    ]\n'+
          '  }\n'+
          '}\n'
        },
        { type: 'Text', text: 'Next we\'ll talk about Mutations.'},
        { type: 'Navigation', back: 'Aliases', next: 'Mutations', doc: 'GraphSQL'}
      ],
      'Mutations': [
        { type: 'Text', text: 'Mutations let you create or update existing data in Salesforce. They look similar to Queries, but instead of passing in arguments, you specify the field values instead. You also need to specify "Mutation" at the start of your query. This basic example creates an Account called "Test":'},
        { type: 'Code', 
          left:
          'mutation {\n' +
          '  Account(Name: Test) {\n' +
          '    Id\n' +
          '  }\n' +
          '}',
          right:
          '{\n' +
          '  "queries": null,\n' +
          '  "mutations": [\n' +
          '    "INSERT INTO Account (Name) VALUES (Test)"\n' +
          '  ],\n' +
          '  "errors": [],\n' +
          '  "data": {\n' +
          '    "Account": [\n' +
          '      {\n' +
          '        "Id": "0014J00000BBfHoQAL"\n' +
          '      }\n' +
          '    ]\n' +
          '  }\n' +
          '}'
        },
        { type: 'Text', text: 'You can see we have a few differences straight away. Instead of getting the "queries" key populated, we instead have a list of "mutations". These are all the actions run in Salesforce, written in a SQL format. This let\'s you see what actually happened during your mutation. '},
        { type: 'Text', text: 'Like Queries, the fields we specified are returned to us, in this case from the newly created record. You can specify any fields on your Mutation and they will be returned in the result.'},
        { type: 'Subtitle', text: 'Nested Mutations'},
        { type: 'Text', text: 'Like Queries you can nest multiple levels in Mutations, meaning you can insert a record with related child data in the same call.'},
        { type: 'Code', 
          left:
          'mutation {\n' +
          '  Account(Name: Test) {\n' +
          '    Id\n' +
          '    Contact(FirstName: Jane, LastName: Doe) {\n' +
          '      Id\n' +
          '    }\n' +
          '  }\n' +
          '}',
          right:
          '{\n' +
          '  "queries": null,\n' +
          '  "mutations": [\n' +
          '    "INSERT INTO Account (Name) VALUES (Test)",\n' +
          '    "INSERT INTO Contact (FirstName, LastName, AccountId) VALUES (Jane, Doe, 0014J00000BBfupQAD)"\n' +
          '  ],\n' +
          '  "errors": [],\n' +
          '  "data": {\n' +
          '    "Account": [\n' +
          '      {\n' +
          '        "Contact": [\n' +
          '          {\n' +
          '            "AccountId": "0014J00000BBfupQAD",\n' +
          '            "Id": "0034J000009sp6QQAQ"\n' +
          '          }\n' +
          '        ],\n' +
          '        "Id": "0014J00000BBfupQAD"\n' +
          '      }\n' +
          '    ]\n' +
          '  }\n' +
          '}'
        },
        { type: 'Text', text: 'You can see both INSERT actions processed, and that the child contact was inserted using the Id of the Account as the AccountId field automatically. You can specify any fields to be returned for both the top-level record and any subsequent child records.'},
        { type: 'Text', text: 'Next let\'s take a look at the GraphSQL Playground.'},
        { type: 'Navigation', back: 'Variables', next: 'GraphSQL Playground', doc: 'GraphSQL'}
      ],
      'GraphSQL Playground': [
        { type: 'Text', text: 'In the GraphSQL Playground you can try out different GraphQL queries just by writing them, without having to write any code. The playground uses the same internal processing as the endpoint so you can be sure that you\'ll get consistent results.'},
        { type: 'Image', text: 'Quickly test out GraphQL queries with the GraphSQL Playground', image: '../screenshots/playground.PNG'},
        { type: 'Subtitle', text: 'GraphQL Input'},
        { type: 'Text', text: 'The top left input box is the GraphQL Query input. This is where you can enter your GraphQL query that you want to run. From the select menu you can set some of our preset examples to give you an idea of different things you can query. You can include any of the features mentioned earlier.'},
        { type: 'Subtitle', text: 'GraphQL Variables Input'},
        { type: 'Text', text: 'The bottom left input box is the GraphQL Variables input. This is where you can enter variables for your GraphQL query. This should be in JSON format. These will be used to replace any variables you\'ve written in your GraphQL query.'},
        { type: 'Subtitle', text: 'JSON Result Output'},
        { type: 'Text', text: 'The right output box is the result of your GraphQL query. It will be updated everytime you click the "Run Query" button, and is always in a JSON format. This is the exact same response that any calls to the endpoint will return. It will contain the following keys:'},
        { type: 'List', items: ['Queries: A list of all the SOQL run from your GraphQL (if running a Query)', 'Mutations: A list of all inserts/updates run (if running a Mutation)', 'Errors: Details of any issues while running the query.', 'Data: Your queried data returned in the matching structure you\'d expect from GraphQL.']},
        { type: 'Text', text: 'Read on to find out how to send GraphQL queries directly to the Salesforce REST API.'},
        { type: 'Navigation', back: 'Variables', next: 'GraphSQL Endpoint', doc: 'GraphSQL'}
      ],
      'GraphSQL Endpoint': [
        { type: 'Text', text: 'To use GraphQL in your integrations, you can use the custom REST endpoint provided by the package.'},
        { type: 'Warning', text: 'If you\'re making requests to this endpoint, make sure you\'ve whitelisted your requesting domains in Setup -> CORS'},
        { type: 'Text', text: 'The URL for this will be ``https://instance.salesforce.com/services/apexrest/aptk_graphql/graphql`. This endpoint will only accept a POST, and you must specify the Content-Type header as "application/json". You should send your GraphQL query in the following JSON format in the body of your request.'},
        { type: 'Code',
          left:
          '{\n' +
          '  "query": "...",\n' +
          '  "variables": { "myVariable": "someValue", ... }\n' +
          '}\n',
          right:
          '{\n' +
          '  "Queries": ["SELECT Id FROM Account", ...],\n' +
          '  "Mutations": null\n' +
          '  "Errors": null\n' +
          '  "Data": { ... }\n' +
          '}\n'
        },
        { type: 'Text', text: 'In response you will always get a JSON object with keys for "Queries", "Mutations" "Errors", and "Data". The Data key will contain your data in the format of your query.'},
        { type: 'Text', text: 'The JSON string responded will be escaped, this is due to how Salesforce\'s Apex RestResource handles returning JSON strings.'},
        { type: 'Text', text: 'If you want to try out the endpoint with cURL you will need to ensure you escape your JSON query. You can use the following cURL as an example:'},
        { type: 'Text', text: '``curl ${INSTANCE_URL}/services/apexrest/aptk_graphql/graphql -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ${ACCESS_TOKEN}" -H "X-PrettyPrint:1" -d "{ \\"query\\": \\"query { Account(Limit: 2) { Name } }\\" }" -s`'},
        { type: 'Warning', text: 'You also need to make sure you send an authenticated session token in the header of your request. See the [https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_understanding_authentication.htm]REST API authentication[] for more details.'}
      ],
      'Known Issues': [
        { type: 'Text', text: 'The following are issues that we know about, that we are currently looking into solving. If you come across any issues when using GraphSQL, please let us know through our [https://url.appitek.com/feedback?ref=graphsql]feedback form[].'},
        { type: 'Subtitle', text: 'Issues'},
        { type: 'ListS', items: ['If a parent object has two lookups to the same object, there is currently no way to specify which one to use in a child query. We plan on adding this as a parameter so you can specify the relationship to use, i.e. ``Event[WhoId]`']},
      ],
      'Planned Features': [
        { type: 'Text', text: 'We have a lot of ideas at Appitek HQ of how we can improve GraphSQL, and we\'re always listening to feedback from our users! If you have any ideas of things you think would improve your experience, let us know through our [https://url.appitek.com/feedback?ref=graphsql]feedback form[].' },
        { type: 'Subtitle', text: 'Planned Features'},
        { type: 'ListS', items: ['Fragments', 'Aliases for individual fields']}
      ],
      'Page Not Found': [
        { type: 'Text', text: 'We couldn\'t find the page you were looking for. <br/> Please pick a different item from the menu or try searching for your problem in the search bar above.'}
      ],
    }
  }
}

function searchDocumentation(event, type) {
  var search = document.getElementById('documentation-search').value.toLowerCase();
  if (event.key == 'Enter' && search != '') {
    [].slice.call(document.getElementsByClassName('selected'), 0).forEach(function(el) {
      if (el.className.indexOf('doc-p') != -1) {
        el.className = 'doc-p';
      }
    })
    var label = document.getElementById('documentation-search').value;
    var pages = documentation[type].pages;
    var mount = document.getElementById('documentation-content');
    mount.innerHTML = '';
    var title = document.createElement('h2');
    title.innerText = 'Search results for "' + label + '"';
    title.style.marginBottom = '20px';
    mount.appendChild(title);
    var matches = {};
    for (var page in pages) {
      pages[page].forEach(function(section) {
        if (section.type == 'Text' && section.text.toLowerCase().indexOf(search) != -1) {
          if (matches[page] == undefined) matches[page] = [];
          matches[page].push(getSnippet(section.text, search))
        }
        if (section.type == 'List') {
          var text = section.items.join('\n\n');
          if (text.toLowerCase().indexOf(search) != -1) {
            if (matches[page] == undefined) matches[page] = [];
            matches[page].push(getSnippet(text, search))
          }
        }
      })
    }
    for (var match in matches) {
      var link = document.createElement('div');
      link.className = 'aptk-documentation--result';
      link.setAttribute('onclick', 'loadPage(\'' + match + '\', \'' + type + '\')');
      var page = document.createElement('h3');
      page.innerText = match + ' Page';
      link.appendChild(page);
      matches[match].forEach(function(snip) {
        var snippet = document.createElement('p');
        snippet.innerHTML = processText(snip);
        link.appendChild(snippet);
      })
      mount.appendChild(link);
    }
  }
}

function getSnippet(text, match) {
  var spacing = 40;
  var startIndex = text.toLowerCase().indexOf(match);
  var startOffset = startIndex > spacing ? spacing : 0;
  var startText = '...' + text.substring(startOffset, startIndex);
  var endIndex = startIndex + match.length;
  var endOffset = text.length > endIndex + spacing ? endIndex + spacing : text.length;
  var endText = text.substring(endIndex, endOffset) + '...';
  var snippet = '<span class="aptk-documentation--highlight">' + text.substring(startIndex, endIndex) + '</span>';
  return startText + snippet + endText;
}

function loadDocumentation(type, page) {
  var docs = documentation[type];
  var mount = document.getElementById('documentation-menu');
  mount.innerHTML = '';
  docs.menu.forEach(function(item) {
    var menu = document.createElement('li');
    var name = document.createElement('p');
    name.setAttribute('onclick', 'loadPage(\'' + item.name + '\', \'' + type + '\')');
    name.id = item.name;
    name.innerText = item.name;
    name.className = 'doc-p';
    menu.appendChild(name);
    if (item.links.length > 0) {
      var links = document.createElement('ul');
      links.className = 'sub';
      item.links.forEach(function(link) {
        var sub = document.createElement('li');
        var subname = document.createElement('p');
        subname.setAttribute('onclick', 'loadPage(\'' + link + '\', \'' + type + '\')');
        subname.innerText = link;
        subname.id = link;
        sub.appendChild(subname);
        links.appendChild(sub);
      })
      menu.appendChild(links);
    }
    mount.appendChild(menu);
  });
  for (p in docs.pages) {
    docs.pages[p].unshift({ type: 'Title', text: p });
  }
  loadPage(page, type);
}

function loadPage(name, type) {
  window.scroll(0, 0);
  console.log('Loading ' + type + ' Documentation for ' + name);
  window.location.hash = name;
  [].slice.call(document.getElementsByClassName('selected'), 0).forEach(function(el) {
    if (el.className.indexOf('doc-p') != -1) {
      el.className = 'doc-p';
    }
  })
  var docs = documentation[type];
  document.getElementById('documentation-search').value = '';
  var mount = document.getElementById('documentation-content');
  var menu = document.getElementById(name);
  if (menu) menu.className = 'doc-p selected';
  mount.innerHTML = '';
  var content = docs.pages[name] || docs.pages['Page Not Found'];
  var codes = [];
  content.forEach(function(item) {
    var el;
    switch(item.type) {
      case 'Title': 
        el = document.createElement('h2');
      break;
      case 'Subtitle':
        el = document.createElement('h3');
      break;
      case 'Text': 
        el = document.createElement('p');
      break;
      case 'Warning': 
        el = document.createElement('span');
        el.className = 'aptk-documentation--warning';
      break;
      case 'List':
        el = document.createElement('ul');
        el.className = 'aptk-documentation--list';
      break;
      case 'Code':
        el = document.createElement('div');
        el.className = 'aptk-documentation--block';
      break;
      case 'ListS':
        el = document.createElement('ul');
        el.className = 'aptk-documentation--list alt';
      break;
      case 'Image': 
        el = document.createElement('div');
        el.className = 'aptk-documentation--image';
      break;
      case 'Navigation':
        el = document.createElement('div');
        el.className = 'aptk-documentation--links';
      break;
    }
    if (item.type == 'Code') {
      console.log(item);
      var leftText = document.createElement('textarea');
      leftText.value = item.left;
      var rightText = document.createElement('textarea');
      rightText.value = item.right;
      el.appendChild(leftText);
      el.appendChild(rightText);
      codes.push(leftText);
      codes.push(rightText);
    } else if (item.type == 'List' || item.type == 'ListS') {
      if (item.items) {
        item.items.forEach(function(point) {
          var list = document.createElement('li');
          if (point.indexOf(':') != -1) {
            var split = point.split(':');
            list.innerHTML = processText('<b>' + split.shift() + '</b>: ' + split.join(':'));
          } else {
            list.innerHTML = processText(point);
          }
          el.appendChild(list);
        })
      }
    } else if (item.type == 'Navigation') {
      if (item.next) {
        var next = document.createElement('button');
        next.className = 'aptk-button action';
        next.innerText = 'Next';
        next.setAttribute('onclick', 'loadPage(\'' + item.next + '\', \'' + item.doc + '\')');
        el.appendChild(next);
      }
      if (item.back) {
        var back = document.createElement('button');
        back.className = 'aptk-button';
        back.innerText = 'Back';
        back.setAttribute('onclick', 'loadPage(\'' + item.back + '\', \'' + item.doc + '\')');
        el.appendChild(back);
      }
    } else if (item.type == 'Image') {
      var link = document.createElement('a');
      try {
        link.href = $VF == true ? $URL + '/' + item.image.split('/screenshots/')[1] : item.image;
      } catch(e) {
        link.href = item.image;
      }
      link.target = '_blank';
      var img = document.createElement('img');
      try {
        img.src = $VF == true ? $URL + '/' + item.image.split('/screenshots/')[1] : item.image;
      } catch(e) {
        img.src = item.image;
      }
      var desc = document.createElement('p');
      desc.innerHTML = processText(item.text);
      link.appendChild(img);
      link.appendChild(desc);
      el.appendChild(link);
    } else {
      el.innerHTML = processText(item.text);
    }
    mount.appendChild(el);
  });
  codes.forEach(function(code) {
    CodeMirror.fromTextArea(code, {
      lineNumbers: true,
      readOnly: true
    })
  })
}

function processText(text) {
  if (!text) return '';
  return text.replace(/``/g, '<span class="aptk-documentation--code">')
    .replace(/`/g, '</span>')
    .replace(/\[\]/g, '</a>')
    .replace(/\[/g, '<a target="_blank" href="')
    .replace(/\]/g, '">');
}
