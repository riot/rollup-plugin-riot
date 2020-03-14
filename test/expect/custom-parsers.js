const name = 'bublé and cssnext';

var CustomParser = {
  'css': ``,

  'exports': {
    title: `Hello ${ name }!`
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<h1 expr9="expr9"> </h1>', [{
      'redundantAttribute': 'expr9',
      'selector': '[expr9]',

      'expressions': [{
        'type': expressionTypes.TEXT,
        'childNodeIndex': 0,

        'evaluate': function(scope) {
          return scope.title;
        }
      }]
    }]);
  },

  'name': 'custom-parsers'
};

export default CustomParser;
