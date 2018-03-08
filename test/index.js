var path = require('path');
var tester = require('gitbook-tester');
var assert = require('assert');

var pkg = require('../package.json');

describe('wavedrom', function() {
    it('should correctly replace by ```wavedrom``` tag', function() {
        this.timeout(50000);
        return tester.builder()
            .withContent('\n```wavedrom\n{ signal : [{ name: "clk",  wave: "p." }]} \n```')
            .withLocalPlugin(path.join(__dirname, '..'))
            .withBookJson({
                gitbook: pkg.engines.gitbook,
                plugins: ['wavedrom']
            })
            .create()
            .then(function(result) {
                var crypto = require('crypto');
                var digest = crypto.createHash('sha256').update(result[0].content).digest('hex');
                assert.equal(digest, '931aeace87840a7738ab02b8682d2ebe63500fe97f38fdc73b0999a688f61c97');
            });
    });
    it('should correctly replace by {% wavedrom %} and endwavedrom {% endwavedrom %} tag', function() {
        this.timeout(50000);
        return tester.builder()
            .withContent('\n{% wavedrom %}\n{ signal : [{ name: "clk",  wave: "p." }]} \n{% endwavedrom %}')
            .withLocalPlugin(path.join(__dirname, '..'))
            .withBookJson({
                gitbook: pkg.engines.gitbook,
                plugins: ['wavedrom']
            })
            .create()
            .then(function(result) {
                var crypto = require('crypto');
                var digest = crypto.createHash('sha256').update(result[0].content).digest('hex');
                assert.equal(digest, '931aeace87840a7738ab02b8682d2ebe63500fe97f38fdc73b0999a688f61c97');
            });
    });
});
