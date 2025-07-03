const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const slugifyLib = require('slugify');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('style.css');
    eleventyConfig.addPassthroughCopy('main.js');
    
    const pathPrefix = '/';

    const markdownLib = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    }).use(markdownItAnchor, {
        slugify: (s) =>
            slugifyLib(s, {
                lower: true,
                strict: true,
                trim: true
            })
    });

    eleventyConfig.setLibrary('md', markdownLib);

    eleventyConfig.addCollection("posts", function (collectionApi) {
        return collectionApi.getFilteredByGlob("posts/*.md");
    });

    eleventyConfig.addFilter("imgUrl", function (filename) {
        return `${pathPrefix}assets/images/${filename}`;
    });

    eleventyConfig.addFilter("docUrl", function (filename) {
        return `${pathPrefix}/posts/${filename}`;
    });

    return {
        dir: {
            input: '.',
            includes: '_includes',
            data: '_data',
            output: '_site'
        },
        pathPrefix: pathPrefix,
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk'
    };
};
