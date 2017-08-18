import riot from 'riot';
//src: /fixtures/first.tag
riot.tag2('first', '<p>{message}</p>', '', '', function(opts) {
    this.message = 'Hello!';
});
