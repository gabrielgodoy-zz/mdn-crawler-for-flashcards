var require = patchRequire(require),
	casper = require('casper').create();

// Listens for logs in Page context
casper.on('remote.message', function(msg) {
	console.log('From page context: ' + msg);
});

module.exports = casper;
