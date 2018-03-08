var path = require('path');
var phantom = require('phantom');
var Q = require('q');

var fs = require('fs-extra')

function processBlock(blk) {
    var deferred = Q.defer();

    var book = this;
    var code = blk.body;
    var config = book.config.get('pluginsConfig.wavedrom', {});

    var width = blk.kwargs['width'];
    var height = blk.kwargs['height'];

    phantom.create().then(function(ph) {
        ph.createPage().then(function(page) {
            var pagePath = path.join(__dirname, 'renderer.html');
            page.open(pagePath).then(function(status) {
                var result = page.evaluate(function(code, config, width, height) {
                    return render(code, config, width, height);
                }, code, config, width, height);
                ph.exit();
                deferred.resolve(result);
            });
        });
    });

    return deferred.promise;
}

module.exports = {
    blocks: {
        wavedrom: {
            process: processBlock
        }
    },
    hooks: {
        // For all the hooks, this represent the current generator
        // [init", "finish", "finish:before", "page", "page:before"] are working.
        // page:* are marked as deprecated because it's better if plugins start using blocks instead. 
        // But page and page:before will probably stay at the end (useful in some cases).

        // This is called before the book is generated
        // Init plugin and read config
        "init": function() {
            if (!Object.keys(this.book.config.get('pluginsConfig.wavedrom', {})).length) {
                this.book.config.set('pluginsConfig.wavedrom', {});
            }
        },

        // Before the end of book generation
        "finish:before": function() {
        },

        // Before parsing markdown
        "page:before": function(page) {
            // Get all code texts
            flows = page.content.match(/^```wavedrom((.*\n)+?)?```$/igm);
            // Begin replace
            if (flows instanceof Array) {
                for (var i = 0, len = flows.length; i < len; i++) {
                    page.content = page.content.replace(
                        flows[i],
                        flows[i].replace(/^```wavedrom/, '{% wavedrom %}').replace(/```$/, '{% endwavedrom %}'));
                }
            }
            return page;
        }
    }
};