let searchForm = require('../public/javascripts/searchForm');

// test file placeholder
test('getting a road by name with blank name should not make an error', () => {
	expect(searchForm.getRoad('Road')).toBe('Road');
});

test('getting a road by name with blank name should not make an error', () => {
	expect(searchForm.getRoad(null)).toBe(null);
});
