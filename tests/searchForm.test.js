const request = require('supertest');
const app = require('../app');

// jest.setTimeout(100000);

describe('Test the root path', () => {
	test('It should response the GET method', done => {
		return request(app).get('/').then(response => {
			expect(response.statusCode).toBe(200);
			done();
		});
	});
});

describe('Test the /roads path', () => {
	test('It should response the POST method', done => {
		request(app).post('/roads').then((response) => {
			expect(response.statusCode).toBe(200);
			done();
		});
	});

	// test('It should responde OK when providing a search value', done => {
	// 	request(app).post('/roads/?search=Strong').then((response) => {
	// 		expect(response.body).toBeDefined();
	// 		done();
	// 	});
	// });

});

describe('Test the / path', () => {
	test('It should response the POST method', done => {
		request(app).get('/').then((response) => {
			expect(response.statusCode).toBe(200);
			done();
		});
	});
});

describe('Test the /nirajmali path', () => {
	test('Should return 404', done => {
		request(app).get('/nirajmali').then((response) => {
			expect(response.statusCode).toBe(404);
			done();
		});
	});
});
