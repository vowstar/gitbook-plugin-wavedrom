# gitbook-plugin-wavedrom

[![Build Status](https://github.com/vowstar/gitbook-plugin-wavedrom/actions/workflows/test.yml/badge.svg)](https://github.com/vowstar/gitbook-plugin-wavedrom/actions)
[![Coverage Status](https://coveralls.io/repos/github/vowstar/gitbook-plugin-wavedrom/badge.svg?branch=master)](https://coveralls.io/github/vowstar/gitbook-plugin-wavedrom?branch=master)
[![NPM Version](https://img.shields.io/npm/v/gitbook-plugin-wavedrom.svg?style=flat)](https://www.npmjs.org/package/gitbook-plugin-wavedrom)
[![NPM Downloads](https://img.shields.io/npm/dm/gitbook-plugin-wavedrom.svg?style=flat)](https://www.npmjs.org/package/gitbook-plugin-wavedrom)

[WaveDrom](http://wavedrom.com/tutorial.html) Plugin for [~~GitBook~~](https://github.com/GitbookIO/gitbook) [Honkit](https://github.com/honkit/honkit)

This is a sample plugin for ~~GitBook~~ Honkit and is specially adapted for ~~GitBook~~ Honkit from [WaveDrom](http://wavedrom.com/tutorial.htm). ~~Gitbook~~ Honkit WaveDrom plugin is used to select from ``WaveDrom`` and converting it into a picture.

WaveDrom is a JavaScript application. WaveJSON is a format that describes Digital Timing Diagrams. WaveDrom renders the diagrams directly inside the browser. Element "signal" is an array of WaveLanes. Each WaveLane has two mandatory fields: "name" and "wave".

## Installation

```bash
npm install gitbook-plugin-wavedrom
```

Add this plugin into ``book.json``.

```bash
{
  "plugins": ["wavedrom"]
}
```

## Features

* Support HTML, PDF, EPUB output(make sure your gitbook support SVG)
* Support `` ```wavedrom `` code block quote
* Multi code style support

### Beautiful Waveform

![Beautiful Waveform](https://raw.github.com/vowstar/gitbook-plugin-wavedrom/master/images/wavedrom.svg?sanitize=true)

## Configuration

book.json add the wavedrom options

```js
"pluginsConfig": {
  "wavedrom": {

  }
}
```

## Usage

To include a wavedrom waveform, just wrap your definition in a "wavedrom" code block. For example:

<pre lang="no-highlight"><code>```wavedrom
{ signal: [
  { name: "pclk", wave: 'p.......' },
  { name: "Pclk", wave: 'P.......' },
  { name: "nclk", wave: 'n.......' },
  { name: "Nclk", wave: 'N.......' },
  { name: 'clk0', wave: 'phnlPHNL' },
  { name: 'clk1', wave: 'xhlhLHl.' },
  { name: 'clk2', wave: 'hpHplnLn' },
  { name: 'clk3', wave: 'nhNhplPl' },
  { name: 'clk4', wave: 'xlh.L.Hx' },
]}
```
</code></pre>

Also you can put in your book block as

```js
{% wavedrom %}
{ signal: [
  { name: "pclk", wave: 'p.......' },
  { name: "Pclk", wave: 'P.......' },
  { name: "nclk", wave: 'n.......' },
  { name: "Nclk", wave: 'N.......' },
  { name: 'clk0', wave: 'phnlPHNL' },
  { name: 'clk1', wave: 'xhlhLHl.' },
  { name: 'clk2', wave: 'hpHplnLn' },
  { name: 'clk3', wave: 'nhNhplPl' },
  { name: 'clk4', wave: 'xlh.L.Hx' },
]}
{% endwavedrom %}
```

Set width and height parameter:

```js
{% wavedrom width=800, height=800 %}
{ signal: [
  { name: "pclk", wave: 'p.......' },
  { name: "Pclk", wave: 'P.......' },
  { name: "nclk", wave: 'n.......' },
  { name: "Nclk", wave: 'N.......' },
  {},
  { name: 'clk0', wave: 'phnlPHNL' },
  { name: 'clk1', wave: 'xhlhLHl.' },
  { name: 'clk2', wave: 'hpHplnLn' },
  { name: 'clk3', wave: 'nhNhplPl' },
  { name: 'clk4', wave: 'xlh.L.Hx' },
]}
{% endwavedrom %}
```

Of course, you can also pass the parameters like this.

<pre><code>```wavedrom {width=600,height=1000}
{ signal: [
  { name: "pclk", wave: 'p.......' },
  { name: "Pclk", wave: 'P.......' },
  { name: "nclk", wave: 'n.......' },
  { name: "Nclk", wave: 'N.......' },
  {},
  { name: 'clk0', wave: 'phnlPHNL' },
  { name: 'clk1', wave: 'xhlhLHl.' },
  { name: 'clk2', wave: 'hpHplnLn' },
  { name: 'clk3', wave: 'nhNhplPl' },
  { name: 'clk4', wave: 'xlh.L.Hx' },
]}
```
</code></pre>

> If use both configure method, the code configure will overwrite the template configure.

## Learn WaveDrom and more information

[WaveDrom](http://wavedrom.com/tutorial.html)

## Thanks

* [@ly0](https://github.com/ly0)
* [@0x00-pl](https://github.com/0x00-pl)
* [@manageryzy](https://github.com/manageryzy)

## See also

These plugins are also available on honkit.

|                                    Plugin                                     |                      Description                       |
| ----------------------------------------------------------------------------- | ------------------------------------------------------ |
| [gitbook-plugin-uml](https://github.com/vowstar/gitbook-plugin-uml)           | A plug-in that use plantuml to draw beautiful pictures |
| [gitbook-plugin-wavedrom](https://github.com/vowstar/gitbook-plugin-wavedrom) | A plug-in that can draw waveforms and register tables  |
| [gitbook-plugin-sequence](https://github.com/vowstar/gitbook-plugin-sequence) | A plug-in that can draw sequence diagrams              |
| [gitbook-plugin-flow](https://github.com/vowstar/gitbook-plugin-flow)         | A plug-in that can draw flowchart.js diagrams          |
| [gitbook-plugin-echarts](https://github.com/vowstar/gitbook-plugin-echarts)   | A plug-in that can draw various charts such as bar/pie |
