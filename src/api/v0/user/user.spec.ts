import { FastifyInstance } from 'fastify';
import { build } from '@server';
import { clearTablesAll } from '@lib/modules/raw-query';

describe('test user signup', () => {
  let server!: FastifyInstance;

  beforeAll(async () => {
    server = await build();
    await clearTablesAll();
  });
  afterAll(async () => {
    await server.close();
  });

  try {
    test('유저 회원가입', async () => {
      const res = await server.inject({
        method: 'POST',
        url: '/api/v0/user/signup',
        payload: {
          type: 'SIGNUP',
          user_nickname: 'asdf',
          user_email: 'asdf@gmail.com',
          user_password: 'password',
        },
      });

      expect(res.statusCode).toBe(201);
    });
  } catch (err) {
    console.error(err);
  }
});
