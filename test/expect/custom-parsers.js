import riot from 'riot';

riot.tag2('custom-parsers', '<h1>{title}</h1>', 'custom-parsers h1,[data-is="custom-parsers"] h1{ color: #f04; border-bottom: 1px solid #f04; }', '', function(opts) {
    const name = 'bublé and cssnext';
    this.title = `Hello ${ name }!`;
});
