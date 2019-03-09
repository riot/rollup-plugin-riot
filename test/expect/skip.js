var Skip = {
  'css': `skip :scope,[is="skip"] :scope{
      display: block;
    }`,

  'exports': {
    message: 'Hello!'
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<p expr7><!----></p>', [{
      'redundantAttribute': 'expr7',
      'selector': '[expr7]',

      'expressions': [{
        'type': expressionTypes.TEXT,
        'childNodeIndex': 0,

        'evaluate': function(scope) {
          return scope.message;
        }
      }]
    }]);
  },

  'name': 'skip'
};

export default Skip;
