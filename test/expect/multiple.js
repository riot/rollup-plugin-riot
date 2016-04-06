import riot from 'riot';

riot.tag2('first', '<p>{message}</p>', '', '', function(opts) {
    this.message = 'Hello!'
});

riot.tag2('second', '<p>{message}</p>', '', '', function(opts) {
    this.message = 'Hello!'
});
