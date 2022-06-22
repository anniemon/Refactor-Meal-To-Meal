import {
  FastifyLoggerInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
  fastify,
} from 'fastify';

import { DataSource } from 'typeorm';
import pino from 'pino';

/* eslint-disable @typescript-eslint/no-unused-vars */
declare module 'fastify' {
  export interface FastifyInstance<
    RawServer extends RawServerBase = RawServerDefault,
    RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
    RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
    Logger = FastifyLoggerInstance
  > {
    db: DataSource;
    config: object;
    routes: Array<object>;
    routesMap: object;
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */

const server = fastify({
  logger: pino({ level: 'info' }),
  exposeHeadRoutes: true,
  caseSensitive: false,
});

export default server;
