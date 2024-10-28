/*jshint esversion: 8 */

const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');

async function processBlock(blk) {
    const book = this;
    const code = blk.body;
    const config = book.config.get('pluginsConfig.wavedrom', {});

    const width = blk.kwargs.width;
    const height = blk.kwargs.height;

    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
                args: [
                    '--disable-dev-shm-usage',
                    '--no-sandbox',
                    '--allow-file-access-from-files',
                    '--enable-local-file-accesses'
                ]
            });
            const page = await browser.newPage();

            const htmlFile = path.join(__dirname, 'renderer.html');
            await page.goto("file://" + htmlFile, { waitUntil: 'networkidle2' });

            const xCode = encodeURIComponent(code);
            const xConfig = encodeURIComponent(JSON.stringify(config));
            const xWidth = encodeURIComponent(width);
            const xHeight = encodeURIComponent(height);

            /* istanbul ignore next */
            const result = await page.evaluate(
                `(async () => {
                    const code = decodeURIComponent("${xCode}");
                    const config = JSON.parse(decodeURIComponent("${xConfig}"));
                    const width = decodeURIComponent("${xWidth}");
                    const height = decodeURIComponent("${xHeight}");
                    return await render(code, config, width, height);
                })()`
            );

            await browser.close();
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    blocks: {
        wavedrom: {
            process: processBlock
        }
    },
    hooks: {
        "init": function() {
            if (!Object.keys(this.book.config.get('pluginsConfig.wavedrom', {})).length) {
                this.book.config.set('pluginsConfig.wavedrom', {});
            }
        },
        "finish:before": function() {},
        "page:before": function(page) {
            const flows = page.content.match(/```(\x20|\t)*(wavedrom)((.*[\r\n]+)+?)?```/igm);
            if (Array.isArray(flows)) {
                for (let i = 0, len = flows.length; i < len; i++) {
                    page.content = page.content.replace(
                        flows[i],
                        flows[i]
                            .replace(/```(\x20|\t)*(wavedrom)[ \t]+{(.*)}/i, function(matchedStr) {
                                if (!matchedStr) return "";
                                let newStr = "";
                                let modeQuote = false;
                                let modeArray = false;
                                let modeChar = false;
                                let modeEqual = false;
                                let str = matchedStr.replace(/^\s+|\s+$/g, "");
                                str = str.replace(/```(\x20|\t)*(wavedrom)/i, "");

                                for (let i = 0; i < str.length; i++) {
                                    if (str.charAt(i) === "\"") {
                                        modeQuote = !modeQuote;
                                        modeChar = true;
                                        newStr += str.charAt(i);
                                        continue;
                                    }
                                    if (str.charAt(i) === "[") {
                                        modeArray = true;
                                        newStr += str.charAt(i);
                                        continue;
                                    }
                                    if (str.charAt(i) === "]") {
                                        modeArray = false;
                                        newStr += str.charAt(i);
                                        continue;
                                    }
                                    if (modeQuote || modeArray) {
                                        newStr += str.charAt(i);
                                    } else {
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

                                newStr = newStr.replace(/,$/, "");
                                return `{% wavedrom ${newStr} %}`;
                            })
                            .replace(/```(\x20|\t)*(wavedrom)/i, '{% wavedrom %}')
                            .replace(/```/, '{% endwavedrom %}')
                    );
                }
            }
            return page;
        }
    }
};
