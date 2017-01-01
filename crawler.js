var fs = require('fs'),
	resultLinks,
	casper = require('./basicCasper'),
	URL = 'https://developer.mozilla.org/en-US/docs/Web/SVG/Element';

casper.start(URL);

casper.then(function() {
	this.echo('You are at: ' + this.getCurrentUrl(), 'INFO');

	resultLinks = casper.evaluate(function() {
		var allReferences = document.querySelectorAll('.index ul'),
			linksArray = [];

		[].forEach.call(allReferences, function(ul) {
			[].forEach.call(ul.querySelectorAll('li a'), function(link) {
				var hasDocumentation = !link.getAttribute('class');
				if (hasDocumentation) {
					linksArray.push('https://developer.mozilla.org' + link.getAttribute('href'));
				}
			});
		});
		return linksArray;
	});
});

casper.then(function() {
	var dataDetails = [];

	console.log('resultLinks', resultLinks);

	casper.each(resultLinks, function(self, link) {
		self.thenOpen(link, function() {
			var newData = self.evaluate(function() {
				var topic = document.querySelector('h1').innerText,
					summary = document.querySelector('#wikiArticle > p').innerText;
				return topic + '|' + summary;
			});
			self.echo('Got data for the tag: ' + newData.split('|')[0], 'INFO');
			dataDetails.push(newData);
		});
	});

	casper.then(function() {
		var dataFormatted = dataDetails.join('\n');
		fs.write('data.txt', dataFormatted);
	});
});

casper.run();
