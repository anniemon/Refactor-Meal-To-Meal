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

    const resNoEmail = await server.inject({
      method: 'POST',
      url: '/api/v0/user/signup',
      payload: {
        type: 'SIGNUP',
        name: 'user',
        user_nickname: `asdf`,
        user_password: 'password',
      },
    });
    expect(resNoEmail.statusCode).toBe(400);

    const resNoPw = await server.inject({
      method: 'POST',
      url: '/api/v0/user/signup',
      payload: {
        type: 'SIGNUP',
        name: 'user',
        user_nickname: `asdf`,
        user_email: `asdf@gmail.com`,
      },
    });
    expect(resNoPw.statusCode).toBe(400);

    const resNoNickname = await server.inject({
      method: 'POST',
      url: '/api/v0/user/signup',
      payload: {
        type: 'SIGNUP',
        name: 'user',
        user_email: `asdf@gmail.com`,
        user_password: 'password',
      },
    });
    expect(resNoNickname.statusCode).toBe(400);
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

    const resNoEmail = await server.inject({
      method: 'POST',
      url: '/api/v0/user/login',
      payload: {
        type: 'LOGIN',
        name: 'user',
        user_nickname: `asdf`,
        user_password: 'password',
      },
    });
    expect(resNoEmail.statusCode).toBe(400);

    const resNoPw = await server.inject({
      method: 'POST',
      url: '/api/v0/user/login',
      payload: {
        type: 'LOGIN',
        name: 'user',
        user_nickname: `asdf`,
        user_email: `asdf@gmail.com`,
      },
    });
    expect(resNoPw.statusCode).toBe(400);

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

  test('유저 로그아웃', async () => {
    server.jwt.verify = jest.fn().mockResolvedValue(`verified`);
    const res = await server.inject({
      method: 'GET',
      url: '/api/v0/user/logout',
      headers: { Authorization: `Bearer access-token` },
    });
    expect(res.statusCode).toEqual(200);
    expect(res.raw.req.headers.authorization).toEqual('');

    const resNoAccessToken = await server.inject({
      method: 'GET',
      url: '/api/v0/user/logout',
    });
    expect(resNoAccessToken.statusCode).toEqual(400);

    server.jwt.verify = jest.fn().mockResolvedValue(null);
    const resWrongAccessToken = await server.inject({
      method: 'GET',
      url: '/api/v0/user/logout',
      headers: { authorization: `Bearer wrong-access-token` },
    });
    expect(resWrongAccessToken.statusCode).toEqual(500);
  });
});
