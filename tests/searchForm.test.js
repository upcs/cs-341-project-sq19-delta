let search = require('../js/searchForm');

// test file placeholder
test('getting a road by name with blank name should not make an error', () => {
	expect(search.getRoad('Road')).toBe('Road');
});

test('getting a road by name with blank name should not make an error', () => {
	expect(search.getRoad(null)).toBe(null);
});

test('getSteetName should be defined', () => {
	expect(search.getStreetName()).toBe('');
});

test('getSteetName should be defined', () => {
	expect(search.search()).toBeDefined();
});
