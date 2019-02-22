var Second = {
  'css': null,

  'tag': {
    message: 'Hello!'
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<p expr5><!----></p>', [{
      'redundantAttribute': 'expr5',
      'selector': '[expr5]',

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

var Third = {
  'css': null,

  'tag': {
    components: {
      second: Second
    },

    message: 'Hello!'
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<p expr3><!----></p><second expr4></second>', [{
      'redundantAttribute': 'expr3',
      'selector': '[expr3]',

      'expressions': [{
        'type': expressionTypes.TEXT,
        'childNodeIndex': 0,

        'evaluate': function(scope) {
          return scope.message;
        }
      }]
    }, {
      'type': bindingTypes.TAG,
      'getComponent': getComponent,

      'evaluate': function(scope) {
        return 'second';
      },

      'slots': [],
      'attributes': [],
      'redundantAttribute': 'expr4',
      'selector': '[expr4]'
    }]);
  }
};

export default Third;
