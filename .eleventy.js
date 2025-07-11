const pathPrefix = '/';

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('words');
    eleventyConfig.addPassthroughCopy('style.css');
    eleventyConfig.addPassthroughCopy('main.js');

    eleventyConfig.addFilter('imgUrl', function (filename) {
        return `${pathPrefix}assets/images/${filename}`;
    });

    eleventyConfig.addFilter('slugUrl', function (slug) {
        return `${pathPrefix}${slug}`;
    });

    return {
        dir: {
            input: '.',
            includes: '_includes',
            data: '_data',
            output: '_site'
        },
        pathPrefix: pathPrefix,
        templateFormats: ['njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk'
    };
};
