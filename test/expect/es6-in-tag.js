const greeting = 'Hello!';

var Es6 = {
  'css': null,

  'exports': {
    message: greeting
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<p expr8><!----></p>', [{
      'redundantAttribute': 'expr8',
      'selector': '[expr8]',

      'expressions': [{
        'type': expressionTypes.TEXT,
        'childNodeIndex': 0,

        'evaluate': function(scope) {
          return scope.message;
        }
      }]
    }]);
  },

  'name': 'es6'
};

export default Es6;
