const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const slugifyLib = require('slugify');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('style.css');
    eleventyConfig.addPassthroughCopy('main.js');

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

    return {
        dir: {
            input: '.',
            includes: '_includes',
            data: '_data',
            output: '_site'
        },
        pathPrefix: '/',
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk'
    };
};
