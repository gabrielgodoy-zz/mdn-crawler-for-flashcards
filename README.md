# Simple crawler with [CasperJS](http://docs.casperjs.org) on top or [SlimerJS](https://slimerjs.org/) or [PhantomJS](http://phantomjs.org/)

There is a demo in `crawler.js` showing how to do a search on google and get all links from the first page of search results, and write on a json file.

### Difference of SlimerJS and PhantomJS

- PhantomJS
Headless browser that uses Webkit engine, same as Chrome

- SlimerJS
Almost headless browser that uses Gecko engine, same as Firefox

## Install
`npm i casperjs slimerjs phantomjs-prebuilt -g`

## Run
Casper with PhantomJS
`casperjs crawler.js`

Casper with slimerJS 
`casperjs crawler.js --engine=slimerjs`
