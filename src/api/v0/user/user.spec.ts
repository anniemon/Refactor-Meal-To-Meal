import { FastifyInstance } from 'fastify';
import { build } from '@server';
import { clearTablesAll } from '@lib/modules/raw-query';

describe('test user', () => {
  let server!: FastifyInstance;

  beforeAll(async () => {
    server = await build();
    await clearTablesAll();
  });
  afterAll(async () => {
    await server.close();
  });

  test('유저 회원가입', async () => {
    try {
      for (let i = 10000; i < 10010; i++) {
        const res = await server.inject({
          method: 'POST',
          url: '/api/v0/user/signup',
          payload: {
            type: 'SIGNUP',
            name: 'user',
            user_nickname: `asdf${i}`,
            user_email: `asdf${i}@gmail.com`,
            user_password: 'password',
          },
        });
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.body).data.id).toEqual(i);
      }
    } catch (err) {
      console.error(err);
    }
  });

  test('유저 로그인', async () => {
    const resOk = await server.inject({
      method: 'POST',
      url: '/api/v0/user/login',
      payload: {
        type: 'LOGIN',
        name: 'user',
        user_email: 'asdf10000@gmail.com',
        user_password: 'password',
      },
    });
    expect(resOk.statusCode).toEqual(200);
    expect(JSON.parse(resOk.body)).toHaveProperty('accessToken');

    const resWrongEmail = await server.inject({
      method: 'POST',
      url: '/api/v0/user/login',
      payload: {
        type: 'LOGIN',
        name: 'user',
        user_email: 'notnot@gmail.com',
        user_password: 'password',
      },
    });
    expect(resWrongEmail.statusCode).toEqual(500);

    const resWrongPw = await server.inject({
      method: 'POST',
      url: '/api/v0/user/login',
      payload: {
        type: 'LOGIN',
        name: 'user',
        user_email: 'asdf10000@gmail.com',
        user_password: 'wrongwrong',
      },
    });
    expect(resWrongPw.statusCode).toEqual(500);
  });
});
