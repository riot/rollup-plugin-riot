import riot from 'riot';

riot.tag2('fourth', '<p>{message}</p>', '', '', function(opts) {
    this.message = 'Hello!'
});
