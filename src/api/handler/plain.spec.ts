import 'module-alias/register';
import { FastifyInstance } from 'fastify';
import { build } from '@server';

describe('test plain', () => {
  let server!: FastifyInstance;
  beforeAll(async () => {
    server = await build();
  });
  afterAll(async () => {
    await server.close();
  });
  try {
    test('test plain', async () => {
      for (let i = 0; i < 10; i++) {
        const res = await server.inject({
          method: 'POST',
          url: '/api/v0/plain',
          payload: {
            type: 'TEST',
            name: `number-${i}`,
          },
        });
        expect(res.statusCode).toEqual(200);
      }

      let response = await server.inject({ method: 'GET', url: '/api/v0/plain?limit=5&offset=3&order=ASC' });
      let plains = JSON.parse(response.body);
      expect(response.statusCode).toEqual(200);
      expect(plains.length).toEqual(5);
      expect(plains[0].id).toEqual(4);

      response = await server.inject({ method: 'GET', url: '/api/v0/plain?limit=2&offset=6' });
      plains = JSON.parse(response.body);
      expect(response.statusCode).toEqual(200);
      expect(plains.length).toEqual(2);
      expect(plains[0].id).toEqual(4);

      response = await server.inject({ method: 'GET', url: '/api/v0/plain/1' });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body).name).toEqual('number-0');

      response = await server.inject({ method: 'PUT', url: '/api/v0/plain/1', payload: { name: 'test-value' } });
      expect(response.statusCode).toEqual(200);

      response = await server.inject({ method: 'GET', url: '/api/v0/plain/1' });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body).name).toEqual('test-value');

      response = await server.inject({ method: 'DELETE', url: '/api/v0/plain/0' });
      expect(response.statusCode).toEqual(404);

      response = await server.inject({ method: 'DELETE', url: '/api/v0/plain/1' });
      expect(response.statusCode).toEqual(200);

      response = await server.inject({ method: 'GET', url: '/api/v0/plain' });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body).length).toEqual(9);
    });
  } catch (error) {
    console.error(error);
  }
});
