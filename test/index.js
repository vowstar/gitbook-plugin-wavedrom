/*jshint esversion: 8 */

const path = require('path');
const tester = require('honkit-tester');
const assert = require('assert');
const isSvg = require('is-svg');

const pkg = require('../package.json');

describe('wavedrom', function() {
    this.timeout(50000);
    it('should correctly replace by ```wavedrom``` tag', function() {
        return tester.builder()
            .withContent('\n```wavedrom\n{ signal : [{ name: "clk",  wave: "p." }]} \n```')
            .withLocalPlugin(path.join(__dirname, '..'))
            .withBookJson({
                gitbook: pkg.engines.gitbook,
                plugins: ['wavedrom']
            })
            .create()
            .then(function(result) {
                const svg = result[0].content.match(/<svg[^]*<\/svg>/m).toString();

                assert.equal(isSvg(svg), true);
                assert.equal(svg.includes('path'), true);
                assert.equal(svg.includes('clk'), true);
            });
    });
    it('should correctly replace by ```wavedrom { width = 600, height = 800, foo = "bar" }``` tag', function() {
        return tester.builder()
            .withContent('\n```wavedrom { width = 600, height = 800, foo = "bar" }\n{ signal : [{ name: "clk",  wave: "p." }]} \n```')
            .withLocalPlugin(path.join(__dirname, '..'))
            .withBookJson({
                gitbook: pkg.engines.gitbook,
                plugins: ['wavedrom']
            })
            .create()
            .then(function(result) {
                const svg = result[0].content.match(/<svg[^]*<\/svg>/m).toString();

                assert.equal(isSvg(svg), true);
                assert.equal(svg.includes('path'), true);
                assert.equal(svg.includes('clk'), true);
            });
    });
    it('should correctly replace by {% wavedrom %} and endwavedrom {% endwavedrom %} tag', function() {
        return tester.builder()
            .withContent('\n{% wavedrom %}\n{ signal : [{ name: "clk",  wave: "p." }]} \n{% endwavedrom %}')
            .withLocalPlugin(path.join(__dirname, '..'))
            .withBookJson({
                gitbook: pkg.engines.gitbook,
                plugins: ['wavedrom']
            })
            .create()
            .then(function(result) {
                const svg = result[0].content.match(/<svg[^]*<\/svg>/m).toString();

                assert.equal(isSvg(svg), true);
                assert.equal(svg.includes('path'), true);
                assert.equal(svg.includes('clk'), true);
            });
    });
});
