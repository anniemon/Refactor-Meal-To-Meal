import { db } from './db-connection';
import { Connection } from 'typeorm';
import {
  FastifyLoggerInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from 'fastify';

/* eslint-disable @typescript-eslint/no-unused-vars */
declare module 'fastify' {
  export interface FastifyInstance<
    RawServer extends RawServerBase = RawServerDefault,
    RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
    RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
    Logger = FastifyLoggerInstance
  > {
    db: Connection;
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */

import { fastify } from 'fastify';
import fastifyCors from '@fastify/cors';
import pino from 'pino';
import { swagger } from './swagger';
import apiv0 from './api/v0';

export const build = () => {
  const server = fastify({
    logger: pino({ level: 'info' }),
    exposeHeadRoutes: true,
    caseSensitive: false,
  });

  server.register(fastifyCors, {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  server.register(db);
  server.register(swagger);
  server.register(apiv0, { prefix: '/api/v0' });
  server.get('/', async function (request, reply) {
    try {
      return reply.code(200).send('fastcampus bpo api server');
    } catch (error) {
      return reply.send(500);
    }
  });
  return server;
};

export const localIP = ['local', 'test'].includes(process.env.NODE_ENV as string) ? '127.0.0.1' : '0.0.0.0';
export const port = process.env.PORT || 7000;
