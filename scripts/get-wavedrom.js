var fs = require('fs');
var path = require('path');

var download = require('./download');

var PACKAGE_JSON_PATH = path.join(__dirname, '../package.json');
var wavedromVersion = require(PACKAGE_JSON_PATH).wavedromVersion;

var ASSETS_DIR_PATH = path.join(__dirname, '../assets');
var WAVEDROM_PATH = path.join(ASSETS_DIR_PATH, 'wavedrom.min.js');
var WAVEDROM_SKIN_DEFAULT_PATH = path.join(ASSETS_DIR_PATH, 'skins', 'default.js');
var WAVEDROM_SKIN_DARK_PATH = path.join(ASSETS_DIR_PATH, 'skins', 'dark.js');
var WAVEDROM_SKIN_LOWKEY_PATH = path.join(ASSETS_DIR_PATH, 'skins', 'lowkey.js');
var WAVEDROM_SKIN_NARROW_PATH = path.join(ASSETS_DIR_PATH, 'skins', 'narrow.js');

var WAVEDROM_BASE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/wavedrom';
var WAVEDROM_URL = WAVEDROM_BASE_URL + '/' + wavedromVersion + '/wavedrom.min.js';
var WAVEDROM_SKIN_DEFAULT_URL = WAVEDROM_BASE_URL + '/' + wavedromVersion + '/skins/default.js';
var WAVEDROM_SKIN_DARK_URL = WAVEDROM_BASE_URL + '/' + wavedromVersion + '/skins/dark.js';
var WAVEDROM_SKIN_LOWKEY_URL = WAVEDROM_BASE_URL + '/' + wavedromVersion + '/skins/lowkey.js';
var WAVEDROM_SKIN_NARROW_URL = WAVEDROM_BASE_URL + '/' + wavedromVersion + '/skins/narrow.js';

console.log('Downloading version ' + wavedromVersion);
download(WAVEDROM_URL, WAVEDROM_PATH, true);
download(WAVEDROM_SKIN_DEFAULT_URL, WAVEDROM_SKIN_DEFAULT_PATH, true);
// download(WAVEDROM_SKIN_DARK_URL, WAVEDROM_SKIN_DARK_PATH, true);
// download(WAVEDROM_SKIN_LOWKEY_URL, WAVEDROM_SKIN_LOWKEY_PATH, true);
// download(WAVEDROM_SKIN_NARROW_URL, WAVEDROM_SKIN_NARROW_PATH, true);


