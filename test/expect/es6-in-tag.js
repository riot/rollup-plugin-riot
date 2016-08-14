import riot from 'riot';

const greeting = 'Hello!'

riot.tag2('es6', '<p>{message}</p>', '', '', function(opts) {

    this.message = greeting
});
