import { expect } from 'chai';
import app from '../index.js';
import supertest from "supertest"

const requestWithSupertest = supertest(app);

describe('Express App', () => {
	describe('GET /', function() {
		it('server should respond', async function() {
			const response = await requestWithSupertest.get('/');
			expect(response.status).to.equal(200);
			expect(response.body).to.have.property('message');
		});
	})
});
