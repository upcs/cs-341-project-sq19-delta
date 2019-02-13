// browserMock.js
Object.defineProperty(document, 'currentScript', {
	value: document.createElement('script'),
});
