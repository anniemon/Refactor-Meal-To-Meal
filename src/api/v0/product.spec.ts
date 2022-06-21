import 'module-alias/register';
import { FastifyInstance } from 'fastify';
import { build } from '@server';

describe('test product', () => {
  let server!: FastifyInstance;
  beforeAll(async () => {
    server = await build();
  });
  afterAll(async () => {
    await server.close();
  });
  try {
    test('test product', async () => {
      for (let i = 0; i < 10; i++) {
        const res = await server.inject({
          method: 'POST',
          url: '/api/v0/product',
          payload: {
            type: 'TEST',
            state: 'NORMAL',
            flags: i,
            code: null,
            name: `number-${i}`,
            description: null,
            extras: { foo: 'bar' },
          },
        });
        expect(res.statusCode).toEqual(200);
      }

      let response = await server.inject({ method: 'GET', url: '/api/v0/product' });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body).length).toEqual(10);

      response = await server.inject({ method: 'GET', url: '/api/v0/product/1' });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body).name).toEqual('number-0');

      response = await server.inject({ method: 'PUT', url: '/api/v0/product/1', payload: { name: 'test-value' } });
      expect(response.statusCode).toEqual(200);

      response = await server.inject({ method: 'GET', url: '/api/v0/product/1' });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body).name).toEqual('test-value');

      response = await server.inject({ method: 'DELETE', url: '/api/v0/product/0' });
      expect(response.statusCode).toEqual(404);

      response = await server.inject({ method: 'DELETE', url: '/api/v0/product/1' });
      expect(response.statusCode).toEqual(200);

      response = await server.inject({ method: 'GET', url: '/api/v0/product' });
      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body).length).toEqual(9);
    });
  } catch (error) {
    console.error(error);
  }
});
