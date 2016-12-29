var fs = require('fs'), // PhantomJS File System module
	casper = require('casper').create();

// Listens for logs in Page context
casper.on('remote.message', function(msg) {
	console.log('Message from the page context: ' + msg);
});

var URL = 'https://www.google.com',
	searchTerm = 'jobs';

casper.start(URL, function() {
	this.echo('Page title: ' + this.getTitle(), 'INFO');
}).thenEvaluate(function(term) {
	document.querySelector('input[name="q"]').setAttribute('value', term);
	document.querySelector('form[name="f"]').submit();
}, searchTerm);

casper.then(function() {
	this.echo('You are now at: ' + this.getCurrentUrl(), 'INFO');

	var resultLinks = casper.evaluate(function() {
		var links = [];

		[].forEach.call(document.querySelectorAll('#ires ol .g'), function(result) {
			links.push({
				text: result.querySelector('h3.r').innerText,
				link: result.querySelector('h3.r a').getAttribute('href')
			});
		});

		return links;
	});

	casper.then(function() {
		fs.write('data.json', JSON.stringify(resultLinks, null, 4), 'w');
	});

});

casper.run();
