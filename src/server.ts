import server from '@lib/modules/fastify-server';
import { db } from '@lib/db-connection';

import fastifyCors from '@fastify/cors';
import { FastifyCookieOptions } from '@fastify/cookie';
import cookie from '@fastify/cookie';
import { swagger } from './swagger';

import addHookLocals from '@lib/middleware/add-hook-locals';
import errorHandler from '@lib/middleware/error-handler';

import plain from '@api/handler';
import apiv0 from './api/v0';

export const build = async () => {
  server.register(fastifyCors, {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  server.register(cookie, {
    //secret: 'my-secret', // for cookies signature
    //parseOptions: {}, // options for parsing cookies
  } as FastifyCookieOptions);
  server.register(db);
  server.register(swagger);
  server.register(addHookLocals);
  server.register(errorHandler);
  //TODO: prod 환경에서는 plain 을 제거해야 한다.
  server.register(plain, { prefix: '/.api' });
  server.register(apiv0, { prefix: '/api/v0' });
  server.get('/', async function (request, reply) {
    try {
      return reply.code(200).send(`server builds`);
    } catch (error) {
      return reply.send(500);
    }
  });

  return server;
};

export const localIP = ['local', 'test'].includes(process.env.NODE_ENV as string) ? '127.0.0.1' : '0.0.0.0';
export const port = process.env.PORT || 8084;
