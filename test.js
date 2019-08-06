var get = 'http://myapi/graphql?query={me{name other{name}}}';

var query1 = '{me{name other{name}}}';
var query2 = '{\tMyName: Account(first:2 offset:3) {\t\tName\t\tContact {\t\t\tFirstName\t\t\tLastName\t\t}\t\tIndustry\t}\tLead(first:5) {\t\tFirstName\t}}';
var query3 = '{\tAccount(first:2 offset:3) {\t\tName\t\t# Queries can have comments\t\tContact {\t\t\tFirstName\t\t\tLastName\t\t}\t\tIndustry\t}\tLead(first:5) {\t\tFirstName\t}}';

function graphQLtoJSON(graphql) {
  console.log(graphql);
  var query = convertQuery(graphql);
  var sections = query.split('}');
  var json = {};
  var current = null;
  var history = [];
  for (var s = 0; s < sections.length; s++) {
    var section = sections[s].split('{');
    for (var i = 0; i < section.length; i++) {
      var segment = section[i];
      if (segment != '') {
        // start of an object nest
        if (segment.indexOf('XSTARTX') != -1 && segment.indexOf('XENDX') == -1) {
          var parameters = segment.split(' ');
          var object = parameters[parameters.length - 2];
          // only object
          if (parameters.length == 2) {

            var obj = getObject(object);
            json[obj.name] = obj;
            current = json[obj.name];
            history.push(current);
            
          // has fields
          } else if (parameters.length > 2) {
            var fields = parameters.slice(0, parameters.length - 2).filter(function(f) {
              return f != '';
            });
            var obj = getObject(object);
            if (current == null) {
              json[obj.name] = obj;
              current = json[obj.name];
            } else {
              current.fields = fields;
              current.children[obj.name] = obj;
              current = current.children[obj.name];
            }
            history.push(current);
          }
        } else if (segment.indexOf('XENDX') != -1) {
          // go up
          history.pop();
          current = history[history.length - 1] || json;
          if (segment.indexOf('XSTARTX') != -1) {
            var parameters = segment.split('XENDX')[1].split(' ');
            var object = parameters[parameters.length - 2];
            var obj = getObject(object);
            current[obj.name] = obj;
            current = current[obj.name];
          } else if (segment.indexOf(' ') != -1 && current.fields) {
            var fields = segment.split(' ')[1].split(' ').forEach(function(a) {
              current.fields.push(a.trim());
            });
          }
        } else {
          var fields = segment.split(' ').filter(function(f) {
            return f != '';
          });
          current.fields = fields;
        }
      }
    }
  }
  return json;
};

function getObject(objectName) {
  var name = objectName;
  var options = {};
  var nickname = '';
  if (name.indexOf('(') != -1) {
    var opts = name.split('(')[1].split(')').join('');
    options = opts.split(',');
    name = name.split('(')[0];
  }
  if (name.indexOf(':') != -1) {
    nickname = name.split(':')[0];
    name = name.split(':')[1];
  }
  var object = {
    fields: [],
    children: {},
    options: options,
    name: name,
    nickname: nickname
  };
  return object;
}

function convertQuery(query) {
  query = query.replace(/{/, '');
  query = query.replace(/}/g, '}XENDX ').replace(/{/g, ' XSTARTX{');
  var newquery = '';
  query.split('(').forEach(function(s) {
    if (s.indexOf(')') !== -1) {
      var start = s.split(')')[0].replace(/ /g, ',');
      s = '(' + start + ')' + s.split(')')[1];
    }
    newquery += s;
  });
  newquery = newquery.replace(/\n/g, '').replace(/\t\t/g, ' ').replace(/\t/g, ' ').replace(/: /g, ':').replace(/  /g, ' ');
  return newquery;
}

function jsonToSQL(json) {
  var queries = [];
  for (var obj in json) {
    var object = json[obj];
    var query = 
      'SELECT ' + 
      object.fields.join(', ') +
      getChildQuery(object.children) +
      ' FROM ' + object.name;
    queries.push(query);
  }
  console.log(queries);
}

function getChildQuery(children) {
  var subqueries = [''];
  for (var child in children) {
    var subquery = 
      ' (SELECT ' + 
      children[child].fields.join(', ') +
      ' FROM ' + children[child].name + ')';
    subqueries.push(subquery);
  }
  return subqueries.join(',');
}

var json = graphQLtoJSON(query3);
console.log(json);
jsonToSQL(json);
//graphQLtoJSON(query2);
//graphQLtoJSON(query3);

var js = {
  "Lead":[
    {"FirstName":"Bertha"},
    {"FirstName":"Phyllis"},
    {"FirstName":"Jeff"},
    {"FirstName":"Mike"},
    {"FirstName":"Patricia"}
  ],
  "MyName":[
    {
      "Contact":[
        {"LastName":"Young","FirstName":"Andy"}
      ],
      "Name":"Dickenson plc"
    },
    {
      "Contact":[
        {"LastName":"Barr","FirstName":"Tim"}
      ],
      "Name":"Grand Hotels & Resorts Ltd"
    }
  ]
}