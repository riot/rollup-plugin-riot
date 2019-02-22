const greeting = 'Hello!';

var Es6 = {
  'css': null,

  'tag': {
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
  }
};

export default Es6;
