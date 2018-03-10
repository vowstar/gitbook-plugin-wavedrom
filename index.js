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
                        flows[i].replace(/```(wavedrom)\s+{(.*)}/,
                            function(match, p1, p2) {
                                var newStr = "";
                                var modeQuote = false;
                                var modeArray = false;
                                var modeChar = false;
                                var modeEqual = false;
                                // Trim left and right space
                                var str = p2.replace(/^\s+|\s+$/g,"");

                                // Build new str
                                for(var i = 0; i < str.length; i++){
                                    if (str.charAt(i) == "\"") {
                                        modeQuote = !modeQuote;
                                        modeChar = true;
                                        newStr += str.charAt(i);
                                        continue;
                                    }
                                    if (str.charAt(i) == "[") {
                                        modeArray = true;
                                        newStr += str.charAt(i);
                                        continue;
                                    }
                                    if (str.charAt(i) == "]") {
                                        modeArray = false;
                                        newStr += str.charAt(i);
                                        continue;
                                    }
                                    if (modeQuote || modeArray) {
                                        // In quote, keep all string
                                        newStr += str.charAt(i);
                                    } else {
                                        // Out of quote, process it
                                        if (str.charAt(i).match(/[A-Za-z0-9_]/)) {
                                            modeChar = true;
                                            newStr += str.charAt(i);
                                        } else if (str.charAt(i).match(/[=]/)) {
                                            modeEqual = true;
                                            modeChar = false;
                                            newStr += str.charAt(i);
                                        } else if (modeChar && modeEqual) {
                                            modeChar = false;
                                            modeEqual = false;
                                            newStr += ",";
                                        }
                                    }
                                }

                                newStr = newStr.replace(/,$/,"");

                                return "{% wavedrom " + newStr + " %}";
                            })
                        .replace(/^```wavedrom/, '{% wavedrom %}')
                        .replace(/```$/, '{% endwavedrom %}'));
                }
            }
            return page;
        }
    }
};