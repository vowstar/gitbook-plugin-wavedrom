var path = require('path');
var tester = require('gitbook-tester');
var assert = require('assert');

var pkg = require('../package.json');

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
                const isSvg = require('is-svg');
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
                const isSvg = require('is-svg');
                const svg = result[0].content.match(/<svg[^]*<\/svg>/m).toString();

                assert.equal(isSvg(svg), true);
                assert.equal(svg.includes('path'), true);
                assert.equal(svg.includes('clk'), true);
            });
    });
});
