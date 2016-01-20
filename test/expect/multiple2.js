import riot from 'riot';

riot.tag2('third-a', '<p>{message}</p>', '', '', function(opts) {
    this.message = 'Hello!'
}, '{ }');

riot.tag2('third-b', '<p>{message}</p>', '', '', function(opts) {
    this.message = 'Hello!'
}, '{ }');
