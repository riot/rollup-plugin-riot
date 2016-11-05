import riot from 'riot';

riot.tag2('skip', '<p>{message}</p>', '', '', function(opts) {
    this.message = 'Hello!';
});
