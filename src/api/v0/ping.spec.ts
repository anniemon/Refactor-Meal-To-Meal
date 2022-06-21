import 'module-alias/register';
import { FastifyInstance } from 'fastify';
import { build } from '@server';

describe('test ping', () => {
  let server!: FastifyInstance;
  beforeAll(async () => {
    server = await build();
  });
  afterAll(async () => {
    await server.close();
  });
  try {
    test('test ping pong', async () => {
      const res = await server.inject({ method: 'GET', url: '/api/v0/.ping' });
      expect(res.statusCode).toEqual(200);
    });
  } catch (error) {
    console.error(error);
  }
});
