var First = {
  'css': null,

  'exports': {
    message: 'Hello!'
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<p expr0="expr0"> </p>', [{
      'redundantAttribute': 'expr0',
      'selector': '[expr0]',

      'expressions': [{
        'type': expressionTypes.TEXT,
        'childNodeIndex': 0,

        'evaluate': function(scope) {
          return scope.message;
        }
      }]
    }]);
  },

  'name': 'first'
};

export default First;
